export const isNodeRuntime = () => {
  return typeof module !== "undefined" && module.exports;
};
