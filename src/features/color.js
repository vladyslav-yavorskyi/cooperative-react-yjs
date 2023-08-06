const COLORS_BY_NAME = Object.freeze({
  love: '#eb6f92',
  gold: '#f6c177',
  rose: '#ebbcba',
  pine: '#31748f',
  foam: '#9ccfd8',
  iris: '#c4a7e7',
});
const COLOR_NAMES = Object.keys(COLORS_BY_NAME);

export function getRPColorFromName(key) {
  return COLORS_BY_NAME[key];
}

export function getRPColorFromIndex(index) {
  return getRPColorFromName(COLOR_NAMES[Math.abs(index % COLOR_NAMES.length)]);
}

export function getRandomRPColorName() {
  return COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
}
