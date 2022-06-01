const { getComments: getComments_ } = require('../services/commentService');

const filterByKeyValue = (post) => {
  return ([key, value]) => {
    // for body use includes
    if (typeof post[key] === 'string') {
      return post[key].includes(value);
    }
    return `${post[key]}` === `${value}`;
  };
};

const getComments = async (req, res) => {
  try {
    const { data: comments } = await getComments_();
    return res.json({
      data: comments.filter((post) =>
        Object.entries(req.query).every(filterByKeyValue(post))
      ),
    });
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
