const { getCommentByPost } = require('../services/comment');
const { getAllPosts } = require('../services/post');

module.exports = {
  getTopPosts: async (req, res) => {
    try {
      const allPosts = await getAllPosts();
      const posts = allPosts.data;
      const postsWithPostId = {};
      const postCommentsPromises = posts.map((post) => {
        postsWithPostId[post.id] = post;
        return getCommentByPost(post.id);
      });
      const allPostComment = await Promise.all(
        Object.values(postCommentsPromises)
      );
      allPostComment.forEach((commentResponse) => {
        const data = commentResponse.data;
        const [firstPost] = data;
        const noOfComments = data.length;
        postsWithPostId[firstPost.postId].number_of_comments = noOfComments;
      });
      const sortedPosts = Object.values(postsWithPostId).sort((a, b) => {
        return b.number_of_comments - a.number_of_comments;
      });
      return res.json({ data: sortedPosts });
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        error: true,
        message: err.message,
      });
    }
  },
};
