const { axiosInstance } = require('../api');

module.exports = {
  getAllPosts: () => axiosInstance.get('/posts'),
};
