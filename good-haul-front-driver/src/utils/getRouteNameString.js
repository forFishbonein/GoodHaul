export default getRouteNameString = str => {
  const index = str.indexOf('-');
  const result = index !== -1 ? str.substring(0, index) : str;
  return result;
};
