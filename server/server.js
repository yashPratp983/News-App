var cron = require('node-cron');
const axios = require("axios");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

cron.schedule('* * * * *', async () => {
    console.log('running a task every minute');
    try {
        const response = await axios.post('https://beautiful-rolypoly-1da010.netlify.app//.netlify/functions/user/sendemail')
        console.log(response)
    } catch (error) {
        console.log(error)
    }
});