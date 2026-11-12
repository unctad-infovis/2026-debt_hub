import CSVtoJSON from '@unctad-infovis/general-tools/helpers/CsvToJson.js';
import LoadFile from '@unctad-infovis/general-tools/helpers/LoadFile.js';
import createMaplineSeries from '@unctad-infovis/map-tools/CreateMaplineSeries.js';
import getColor from '@unctad-infovis/map-tools/GetColor.js';
import processTopoObject from '@unctad-infovis/map-tools/ProcessTopoObject.js';
import processTopoObjectPolygons from '@unctad-infovis/map-tools/ProcessTopoObjectPolygons.js';

import Highcharts from 'highcharts';
// https://www.highcharts.com/
import 'highcharts/modules/accessibility';
import 'highcharts/modules/map';

import { useCallback, useEffect, useRef, useState } from 'react';

import './DmfasMap.css';

// Countries whose boundaries in the shared worldmap topology should borrow a neighbouring
// country's data (Macao, Hong Kong, China, Taiwan → China) — disputed-territory colour
// resolution is handled by @unctad-infovis/map-tools' getColor, this is just the input list,
// same convention every UNCTAD project using this topology passes in.
const CHINA_AREAS = ['156', '158', '344', '446'];

// Categorical map: value 2 = current DMFAS installation (blue), 1 = past installation (yellow),
// no value = no deployment (grey, map-tools' own nullColor default).
const CURRENT_COLOR = '#009edb';
const PAST_COLOR = '#ffc800';
const NULL_COLOR = '#ded9d5';
const getColorFromValue = value => {
  if (value === 2) return CURRENT_COLOR;
  if (value === 1) return PAST_COLOR;
  return NULL_COLOR;
};
const STATUS_LABELS = { 2: 'Current installation', 1: 'Past installation' };

const DmfasMap = ({ countries_csv_url }) => {
  const chartRef = useRef(null);
  const [status, setStatus] = useState(countries_csv_url ? 'loading' : 'empty');

  const createMap = useCallback((data, topology) => {
    Highcharts.setOptions({ lang: { decimalPoint: '.', thousandsSep: ' ' } });

    chartRef.current = Highcharts.mapChart('dmfas_map_container', {
      accessibility: {
        description: 'World map showing countries with a current or past installation of UNCTAD’s DMFAS debt-management software.'
      },
      chart: {
        backgroundColor: 'transparent',
        height: Math.max((document.getElementById('dmfas_map_container').offsetWidth * 7) / 16, 380),
        type: 'map'
      },
      credits: { enabled: false },
      exporting: { enabled: false },
      legend: { enabled: false },
      mapNavigation: { enabled: false },
      mapView: { maxZoom: 4 },
      plotOptions: {
        mapline: { lineWidth: 0.33, tooltip: { enabled: false } }
      },
      series: [
        {
          affectsMapView: true,
          mapData: processTopoObjectPolygons(topology, 'economies-color'),
          data: topology.objects.economies.geometries.map(region => {
            const found = data.find(row => row.code === region.properties.code);
            region.properties = found ? { ...region.properties, ...found } : region.properties;
            return {
              borderWidth: 0,
              code: region.properties.code,
              color: getColor(region.properties, data, CHINA_AREAS, getColorFromValue),
              id: region.properties.code,
              name: region.properties.labelen,
              value: data.find(row => row.code === region.properties.code)?.value ?? null
            };
          }),
          enableMouseTracking: true,
          joinBy: ['code', 'code'],
          name: 'dmfas_countries',
          nullColor: NULL_COLOR,
          states: { hover: { borderColor: '#fff', borderWidth: 2 }, inactive: { enabled: false } },
          type: 'map'
        },
        createMaplineSeries('dash_borders', processTopoObject(topology, 'dashed-borders'), 'Dash'),
        createMaplineSeries('dot_borders', processTopoObject(topology, 'dotted-borders'), 'Dot'),
        createMaplineSeries('dash_dot_borders', processTopoObject(topology, 'plain-borders'), 'DashDot'),
        createMaplineSeries('solid_borders', processTopoObject(topology, 'plain-borders'), 'Solid')
      ],
      subtitle: { text: null },
      title: { text: null },
      tooltip: {
        formatter() {
          return `<b>${this.point.name}</b><br />${STATUS_LABELS[this.point.value] ?? 'No DMFAS deployment'}`;
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!countries_csv_url) {
      setStatus('empty');
      return;
    }

    Promise.all([LoadFile(countries_csv_url).then(response => response?.text()), LoadFile('./assets/data/worldmap-economies-54030.topo.json').then(response => response?.json())])
      .then(([csv, topology]) => {
        if (!csv || !topology) throw new Error('DMFAS map data unavailable');

        const data = CSVtoJSON(csv).map(row => ({ code: row.code, value: row.status === 'past' ? 1 : 2 }));
        createMap(data, topology);
        setStatus('ready');
      })
      .catch(error => {
        console.error(error);
        setStatus('error');
      });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [countries_csv_url, createMap]);

  return (
    <div className="dmfas_map_wrapper">
      {status !== 'ready' && <div className="warning dmfas_map_warning">{status === 'error' ? 'Map data could not be loaded' : 'DMFAS country dataset is not yet configured'}</div>}
      {/* Always mounted (never `hidden`, so it keeps a real, correctly-sized DOM node —
          `display:none` would zero its offsetWidth right when createMap reads it) and only
          actually filled once the async load resolves; empty until then. */}
      <div className="dmfas_map" id="dmfas_map_container" />
      {status === 'ready' && (
        <ul className="dmfas_map_legend">
          <li className="dmfas_map_legend_item dmfas_map_legend_item--current">Current installation</li>
          <li className="dmfas_map_legend_item dmfas_map_legend_item--past">Past installation</li>
        </ul>
      )}
    </div>
  );
};

export default DmfasMap;
