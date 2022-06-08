const { getComments } = require('../services/commentService');
const { getAllPosts } = require('../services/postService');

module.exports = {
  getTopPosts: async (_req, res) => {
    try {
      let [{ data: posts }, { data: comments }] = await Promise.all([
        getAllPosts(),
        getComments(),
      ]);

      let hashedComments = {};

      for (const comment of comments) {
        hashedComments[comment.postId] = (hashedComments[comment.postId] ?? 0) + 1
      }

      const unsortedPost = posts.map((post) => {
        return {
          post_id: post.id,
          post_title: post.title,
          post_body: post.body,
          total_number_of_comments: hashedComments[post.id],
        };
      });

      // sort by total_number_of_comments
      return res.json({ data: Object.values(unsortedPost).sort((a, b) => {
        return b.total_number_of_comments - a.total_number_of_comments;
      }) });
    } catch (err) {
      return res.status(400).json({
        error: true,
        message: err.message,
      });
    }
  },
};
