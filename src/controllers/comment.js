const { getComments: getComments_ } = require('../services/comment');

const getComments = async (req, res) => {
  try {
    const comments = await getComments_(req.query);
    return res.json({ data: comments.data });
  } catch (err) {
    return status(400).json({
      error: true,
      message: err.message,
    });
  }
};

module.exports = {
  getComments,
};
