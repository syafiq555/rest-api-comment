const { axiosInstance } = require('../api');

const Comment = {
  getCommentByPost: (idPost) => {
    return axiosInstance.get(`/posts/${idPost}/comments`);
  },
};

module.exports = Comment;
