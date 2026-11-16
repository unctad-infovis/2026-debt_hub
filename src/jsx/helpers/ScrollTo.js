// Smooth-scrolls to the first element matching `selector`; honours prefers-reduced-motion.
const scrollToSelector = selector => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelector(selector)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
};

export default scrollToSelector;
