const { axiosInstance } = require('../api');
const { mapQueryParams } = require('../utils');

const Comment = {
  getCommentByPost: (idPost) => {
    return axiosInstance.get(`/posts/${idPost}/comments`);
  },
  getComments: (queryParams) => {
    let validQueryParams = {};
    const validKeys = ['postId', 'id', 'name', 'email'];
    Object.entries(queryParams).forEach(([key, value]) => {
      if (validKeys.includes(key)) {
        validQueryParams[key] = value;
      }
    });
    const queryString = mapQueryParams(validQueryParams);
    return axiosInstance.get(`/comments?${queryString}`);
  },
};

module.exports = Comment;
