const express = require('express');

const { getComments } = require('./controllers/comment');
const { getTopPosts } = require('./controllers/post');

const app = express();
const port = 3000;

app.get('/posts', getTopPosts);
app.get('/comments', getComments);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
