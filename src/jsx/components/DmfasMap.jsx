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

// Binary "uses DMFAS software" map, not a continuous score — a country either has a
// value (blue) or doesn't (grey, map-tools' own nullColor default).
const getColorFromValue = value => (value ? '#009edb' : '#ded9d5');

const DmfasMap = ({ countries_csv_url }) => {
  const chartRef = useRef(null);
  const [status, setStatus] = useState(countries_csv_url ? 'loading' : 'empty');

  const createMap = useCallback((data, topology) => {
    Highcharts.setOptions({ lang: { decimalPoint: '.', thousandsSep: ' ' } });

    chartRef.current = Highcharts.mapChart('dmfas_map_container', {
      accessibility: {
        description: 'World map highlighting countries where UNCTAD’s DMFAS debt-management software is in use.'
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
          nullColor: '#ded9d5',
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
          return `<b>${this.point.name}</b><br />${this.point.value ? 'Uses DMFAS' : 'No DMFAS deployment'}`;
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

        const data = CSVtoJSON(csv).map(row => ({ code: row.code, value: 1 }));
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
    </div>
  );
};

export default DmfasMap;
