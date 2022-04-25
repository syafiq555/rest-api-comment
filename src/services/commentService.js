const { axiosInstance } = require('../api');
const { mapQueryParams } = require('../utils');

const validKeys = ['postId', 'id', 'name', 'email', 'body'];

const Comment = {
  getCommentByPost: (idPost) => {
    return axiosInstance.get(`/posts/${idPost}/comments`);
  },
  getComments: (queryParams = {}) => {
    let validQueryParams = {};
    Object.entries(queryParams).forEach(([key, value]) => {
      if (validKeys.includes(key)) {
        validQueryParams[key] = value;
      }
    });
    const queryString = mapQueryParams(validQueryParams);
    return axiosInstance.get(`/comments?${queryString}`);
  },
  getComments2: async () => {
    return axiosInstance.get(`/comments`);
  },
};

module.exports = Comment;
