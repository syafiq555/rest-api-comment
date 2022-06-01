const { getComments } = require('../services/commentService');
const { getAllPosts } = require('../services/postService');

module.exports = {
  getTopPosts: async (_req, res) => {
    try {
      let [{ data: posts }, { data: comments }] = await Promise.all([
        getAllPosts(),
        getComments(),
      ]);

      const unsortedPost = posts.map((post) => {
        // put to another variable, to remove the comment after used
        const previousComment = comments;
        // filter and remove comments after used to reduce iteration
        const commentCurrentPost = comments.filter(({ postId }, index) => {
          if (postId === post.id) {
            // reduce the number of iteration
            // remove this comment from all comments as 1 comment for only 1 post, no need already so comments will be reduced for next iteration
            delete previousComment[index];
            return true;
          }
          return false;
        });
        // assign the filtered comments to the original
        comments = previousComment;

        return {
          post_id: post.id,
          post_title: post.title,
          post_body: post.body,
          total_number_of_comments: commentCurrentPost.length,
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
