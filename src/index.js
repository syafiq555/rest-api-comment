const express = require('express');

const { getTopPosts } = require('./controllers/comments');

const app = express();
const port = 3000;

// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

app.get('/comments/top_posts', getTopPosts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
