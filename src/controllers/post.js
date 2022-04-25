const { getCommentByPost } = require('../services/comment');
const { getAllPosts } = require('../services/post');

module.exports = {
  getTopPosts: async (req, res) => {
    try {
      const allPosts = await getAllPosts();
      const posts = allPosts.data;
      const postsWithPostId = {};
      const postCommentsPromises = posts.map((post) => {
        postsWithPostId[post.id] = {
          post_id: post.id,
          post_title: post.title,
          post_body: post.body,
        };
        return getCommentByPost(post.id);
      });
      const allPostComment = await Promise.all(
        Object.values(postCommentsPromises)
      );
      allPostComment.forEach((commentResponse) => {
        const data = commentResponse.data;
        const [firstPost] = data;
        postsWithPostId[firstPost.postId].total_number_of_comments =
          data.length;
      });
      const sortedPosts = Object.values(postsWithPostId).sort((a, b) => {
        return b.total_number_of_comments - a.total_number_of_comments;
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
