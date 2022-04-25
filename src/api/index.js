const { default: axios } = require('axios');

// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

module.exports = {
  axiosInstance,
};
