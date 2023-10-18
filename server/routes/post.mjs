import express from 'express';
import db from '../db/conn.mjs';

//we are creating an instance of express router

const postsRoutes = express.Router();

// Get a list of 50 posts from mongo site database
postsRoutes.get('/', async (req, res) => {
  let collection = await db.collection('posts');
  let results = await collection.find({}).limit(50).toArray();
  res.send(results).status(200);
});

// Fetches the latest posts
postsRoutes.get('/latest', async (req, res) => {
  let collection = await db.collection('posts');
  let results = await collection
    .aggregate([
      { $project: { author: 1, title: 1, tags: 1, date: 1 } },
      { $sort: { date: -1 } },
      { $limit: 3 },
    ])
    .toArray();
  res.send(results).status(200);
});

export default postsRoutes;
