export const wait = (time: number) =>
  new Promise((res) => setTimeout(res, time));

export const getUniqueId = (function () {
  let id = 1;
  return () => [`id${id++}`, `id${id++}-dropdown`];
})();
