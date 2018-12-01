const express = require('express');
const cors = require('cors');
const {getAllPosts, getPost}  = require('./index');

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
	getAllPosts(posts => res.json(posts));
});

app.get('/:id', async (req, res) => {
	getPost(parseInt(req.params.id), post => res.json(post));
});

app.listen(3333, () => console.log("Listening.."));
