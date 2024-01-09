const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const UserModel = require('./models/User');
const BookModel = require("./models/Book");

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/bookstore");

app.listen(3001, () => {
    console.log("server is running");
});

app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(error => res.json(error));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
                    res.cookie('token', token, { httpOnly: true });
                    res.json("success");
                } else {
                    res.json("incorrect password");
                }
            } else {
                res.json("no existing user");
            }
        });
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "invalid user" });
    } else {
        jwt.verify(token, 'your-secret-key', (err, decoded) => {
            if (err) {
                return res.json({ message: "invalid token" });
            } else {
                req.user = decoded;
                next();
            }
        });
    }
};

app.get('/verify', verifyUser, (req, res) => {
    res.json({ message: "valid token", user: req.user });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ logout: true });
});

app.post('/add', verifyUser, (req, res) => {
    BookModel.create(req.body)
        .then(books => res.json(books))
        .catch(error => res.json(error));
});

app.get('/books', (req, res) => {
    try{
        const books = BookModel.find()
        return res.json(books)
    }catch(err){
        return res.json(err)
    }
})