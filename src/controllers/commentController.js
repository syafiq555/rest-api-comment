const { getComments: getComments_ } = require('../services/commentService');

const getComments = async (req, res) => {
  try {
    const { data: comments } = await getComments_();
    // filter comment
    const filteredComments = comments.filter((post) => {
      return Object.entries(req.query).every(([key, value]) => {
        // for body use includes
        if (typeof post[key] === 'string') {
          return post[key].includes(value);
        }
        return `${post[key]}` === `${value}`;
      });
    });
    return res.json({ data: filteredComments });
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
