// LoadEnv variable
import './loadEnv.mjs';
import express from 'express';
import cors from 'cors';
import posts from './routes/post.mjs';
const app = express();

const PORT = process.env.PORT || 5000;

// load the /post routes
app.use('/posts', posts);
