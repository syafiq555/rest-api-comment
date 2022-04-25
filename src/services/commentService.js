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
    let validQueryParams = {};
    // get only valid params
    Object.entries(queryParams).forEach(([key, value]) => {
      if (validKeys.includes(key)) {
        validQueryParams[key] = value;
      }
    });

    const commentResponse = axiosInstance.get(`/comments`);
    // if valid query params empty return
    if (!Object.values(validQueryParams).length) {
      return commentResponse;
    }

    const { data: comments } = await commentResponse.catch((err) => {
      throw err;
    });

    // filter comment
    const filteredComments = comments.filter((post) => {
      return Object.entries(validQueryParams).every(([key, value]) => {
        if (key === 'body') {
          return post[key].includes(value);
        }
        return `${post[key]}` === `${value}`;
      });
    });
    return { data: filteredComments };
  },
};

module.exports = Comment;
