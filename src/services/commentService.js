const { axiosInstance } = require('../api');
const { mapQueryParams } = require('../utils');

const validKeys = ['postId', 'id', 'name', 'email', 'body'];

const Comment = {
  getCommentByPost: (idPost) => {
    return axiosInstance.get(`/posts/${idPost}/comments`);
  },
  getComments: (queryParams = {}) => {
    const queryString = mapQueryParams(queryParams);
    return axiosInstance.get(`/comments?${queryString}`);
  },
  getComments2: () => {
    return axiosInstance.get(`/comments`);
  },
};

module.exports = Comment;
