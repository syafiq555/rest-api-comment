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
  getComments2: async (queryParams = {}) => {
    const { data: comments } = await axiosInstance
      .get(`/comments`)
      .catch((err) => {
        throw err;
      });

    // filter comment
    const filteredComments = comments.filter((post) => {
      return Object.entries(queryParams).every(([key, value]) => {
        // for body use includes
        if (typeof post[key] === 'string') {
          return post[key].includes(value);
        }
        return `${post[key]}` === `${value}`;
      });
    });
    return { data: filteredComments };
  },
};

module.exports = Comment;
