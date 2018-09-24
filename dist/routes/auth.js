"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = require("../models/auth");
const mongoose = require("mongoose");
const shortid = require('shortid');
const router = express.Router();
const db = require('../database');
const Auth = mongoose.model('Auth', auth_1.AuthSchema);
/**
 * authentification apis
 */
router.post('/register', Register);
router.post('/login', Login);
/**
 * functions used by the authentification apis
 */
function Register(req, res, next) {
    const auth = req.body;
    auth.id = shortid.generate();
    db.query('INSERT INTO auth values (?,?,?,?)', [
        auth.id,
        auth.username,
        auth.email,
        auth.password
    ], (error, rows, fields) => {
        if (error) {
            res.json({ 'mysql register error ': error });
        }
    });
    Auth.create(auth, function (error, post) {
        if (error) {
            res.json({ 'mongo register error ': error });
        }
    });
    res.json({ 'SUCCESS': auth });
}
function Login(req, res, next) {
    const auth = req.body;
    Auth.findOne({ email: auth.email, password: auth.password }, function (error, post) {
        if (error) {
            res.json({ 'register error ': error });
        }
        res.send(post);
    });
}
module.exports = router;
//# sourceMappingURL=auth.js.map