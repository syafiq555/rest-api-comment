const mapQueryParams = (queryParams) => {
  return Object.entries(queryParams)
    .reduce((acc, [key, value]) => {
      return [...acc, `${key}=${value ?? ''}`];
    }, [])
    .join('&');
};
module.exports = { mapQueryParams };
