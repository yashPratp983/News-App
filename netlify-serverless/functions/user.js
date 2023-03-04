const express = require('express');
const serverless = require('serverless-http');
const app = express();
const axios = require('axios');
const router = express.Router();
require("dotenv").config();
const mongoose = require('mongoose');
// const User = require('../modals/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cors = require('cors');

app.use(cors());

const conn = mongoose.connect(process.env.MONGOURI);

app.use(express.json());

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    subscribed_author: {
        type: [String],
        default: []
    },
    subscribed_topic: {
        type: [String],
        default: []
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = function (password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, password: this.password }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

const User = mongoose.model('Users', userSchema);


router.post('/signup', async (req, res) => {
    console.log("called")
    try {
        const connect = await conn;
        const user1 = await User.find({ email: req.body.email })
        console.log(user1)
        if (user1.length > 0) {
            return res.status(400).json({ status: false, error: "User already exists" })
        }
        const user = await User.create(req.body);
        const token = await user.getSignedJwtToken();
        console.log(token)
        res.status(200).send({ success: true, token: token });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
);

router.post('/login', async (req, res) => {
    try {
        const connect = await conn;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: false, error: "Please provide an email and password" })
        }

        let user = await User.findOne({ email: email }).select('+password');
        if (!user) {
            return res.status(400).json({ status: false, error: "Invalid credentials" })
        }

        console.log(user)

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ status: false, error: "Invalid credentials" })
        }



        const token = await user.getSignedJwtToken();
        res.status(200).send({ success: true, token: token });

    } catch (err) {
        res.status(500).json({ error: err });
    }
})

router.get('/getuser', async (req, res) => {
    try {
        const connect = await conn;
        if (req.headers.authorisation && req.headers.authorisation.startsWith('Bearer')) {
            token = req.headers.authorisation.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ status: false, error: "Not authorized to access this route" })
        }
        console.log("token", token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("decoded", decoded)

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ status: false, error: "No user found with this id" })
        }

        res.status(200).send({ success: true, user: user });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

router.put('/subscribeauthor', async (req, res) => {
    let token;
    const connect = await conn;
    try {

        if (req.headers.authorisation && req.headers.authorisation.startsWith('Bearer')) {
            token = req.headers.authorisation.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ status: false, error: "Not authorized to access this route" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ status: false, error: "No user found with this id" })
        }

        const author = req.body.author;

        if (user.subscribed_author.includes(author)) {
            return res.status(400).json({ status: false, error: "Already subscribed to this author" })
        }

        user.subscribed_author.push(author);

        await user.save();

        res.status(200).send({ success: true, user: user });

    } catch (err) {
        res.status(500).json({ error: err });
    }
})


router.put('/subscribetopic', async (req, res) => {
    let token;
    try {
        const connect = await conn;
        if (req.headers.authorisation && req.headers.authorisation.startsWith('Bearer')) {
            token = req.headers.authorisation.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ status: false, error: "Not authorized to access this route" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ status: false, error: "No user found with this id" })
        }

        const topic = req.body.topic;

        if (user.subscribed_topic.includes(topic)) {
            return res.status(400).json({ status: false, error: "Already subscribed to this topic" })
        }

        user.subscribed_topic.push(topic);

        await user.save();

        res.status(200).send({ success: true, user: user });

    } catch (err) {
        res.status(500).json({ error: err });
    }
})

router.put('/unsubscribeauthor', async (req, res) => {
    let token;
    try {
        const connect = await conn;

        if (req.headers.authorisation && req.headers.authorisation.startsWith('Bearer')) {
            token = req.headers.authorisation.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ status: false, error: "Not authorized to access this route" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ status: false, error: "No user found with this id" })
        }

        const author = req.body.author;

        if (!user.subscribed_author.includes(author)) {
            return res.status(400).json({ status: false, error: "Not subscribed to this author" })
        }

        user.subscribed_author = user.subscribed_author.filter((item) => item !== author);

        await user.save();

        res.status(200).send({ success: true, user: user });

    } catch (err) {
        res.status(500).json({ error: err });
    }
})

router.put('/unsubscribetopic', async (req, res) => {
    let token;
    try {
        const connect = await conn;
        if (req.headers.authorisation && req.headers.authorisation.startsWith('Bearer')) {
            token = req.headers.authorisation.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ status: false, error: "Not authorized to access this route" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ status: false, error: "No user found with this id" })
        }

        const topic = req.body.topic;

        if (!user.subscribed_topic.includes(topic)) {
            return res.status(400).json({ status: false, error: "Not subscribed to this topic" })
        }

        user.subscribed_topic = user.subscribed_topic.filter((item) => item !== topic);

        await user.save();

        res.status(200).send({ success: true, user: user });

    } catch (err) {
        res.status(500).json({ error: err });
    }
})

app.use('/.netlify/functions/user', router);

module.exports.handler = serverless(app);
