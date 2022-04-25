const {
  // getComments: getComments_,
  getComments2: getComments_,
} = require('../services/comment');

const getComments = async (req, res) => {
  try {
    const comments = await getComments_(req.query);
    return res.json({ data: comments.data });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: err.message,
    });
  }
};

module.exports = {
  getComments,
};
