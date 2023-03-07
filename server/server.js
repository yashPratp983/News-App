var cron = require('node-cron');
const axios = require("axios");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

cron.schedule('* * * * *', async () => {
    console.log('running a task every minute');
    try {
        const response = await axios.get('http://localhost:8888/.netlify/functions/user/sendemail')
        console.log(response)
    } catch (error) {
        console.log(error)
    }
});