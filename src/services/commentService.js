const { axiosInstance } = require('../api');
const { mapQueryParams } = require('../utils');

const Comment = {
  getCommentByPost: (idPost) => {
    return axiosInstance.get(`/posts/${idPost}/comments`);
  },
  getComments: (queryParams = {}) => {
    const queryString = mapQueryParams(queryParams);
    return axiosInstance.get(`/comments?${queryString}`);
  },
};

module.exports = Comment;
