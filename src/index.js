const express = require('express');

const { getComments } = require('./controllers/comment');
const { getTopPosts } = require('./controllers/post');

const app = express();
const port = 3000;

// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

app.get('/posts', getTopPosts);
app.get('/comments', getComments);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
