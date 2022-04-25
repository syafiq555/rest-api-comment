const { axiosInstance } = require('../api');

module.exports = {
  getAllPosts: () => {
    return axiosInstance.get('/posts');
  },
};
