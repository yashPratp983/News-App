
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const axios = require('axios');
// const bodyParser = require('body-parser');
import fetch from 'node-fetch';
const router = express.Router();

// app.use(bodyParser);

router.get('/', async (req, res) => {
    try {
        console.log("called")
        const news = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        let newsData = news.data.map(async (id) => {
            const newsItem = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            return newsItem.data
        })
        newsData = await Promise.all(newsData)
        // newsData = newsData.filter(item => item.type !== 'story')
        console.log(newsData)
        res.status(200).send({ success: true, news: newsData })
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

app.use('/.netlify/functions/fetchnews', router);  // path must route to lambda

module.exports.handler = serverless(app);