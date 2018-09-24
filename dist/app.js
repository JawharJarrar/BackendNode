"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
/**
 * routes defenition
 */
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const authRouter = require('./routes/auth');
/**
 * mongo db connection
 */
mongoose.connect('mongodb://localhost:27017/demo', { promiseLibrary: require('bluebird'), })
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));
class App {
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use('/users', usersRouter);
        this.app.use('/posts', postsRouter);
        this.app.use('/comments', commentsRouter);
        this.app.use('/auth', authRouter);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map