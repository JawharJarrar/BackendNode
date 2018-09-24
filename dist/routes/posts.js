"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const post_1 = require("../models/post");
const comment_1 = require("../models/comment");
const mongoose = require("mongoose");
const shortid = require('shortid');
const router = express.Router();
const db = require('../database');
const Comment = mongoose.model('Comment', comment_1.CommentSchema);
const Post = mongoose.model('Post', post_1.PostSchema);
/**
 * posts apis
 */
router.get('/', FindAllPosts);
router.get('/:id/comments', CommentsByPost);
router.delete('/:id', DeletePost);
router.post('/', AddPost);
router.put('/:id', UpdatePost);
/**
 * fucntions used by posts apis
 */
function FindAllPosts(req, res, next) {
    db.query('select * from  posts', (error, rows, fields) => {
        if (error) {
            res.json({ ' fetch error ': error });
        }
        res.json(rows);
    });
}
function CommentsByPost(req, res, next) {
    Comment.find({ postId: req.params.id }, function (error, post) {
        if (error) {
            res.json({ ' fetch  error ': error });
        }
        res.json(post);
    });
}
function UpdatePost(req, res, next) {
    const post = req.body;
    db.query('UPDATE posts  SET title=?, body=? WHERE id=? ', [
        post.title,
        post.body,
        req.params.id
    ], (error, rows, fields) => {
        if (error) {
            res.json({ 'mysql update error ': error });
        }
    });
    Post.findOneAndUpdate({ id: req.params.id }, req.body, function (error) {
        if (error) {
            res.json({ 'mongo update error ': error });
        }
    });
    res.json({ 'UPDATED': post });
}
function DeletePost(req, res, next) {
    db.query('Delete from  posts  where id=?', [req.params.id], (error) => {
        if (error) {
            res.json({ 'mysql delete error ': error });
        }
    });
    Post.findOneAndRemove({ id: req.params.id }, req.body, function (error) {
        if (error) {
            res.json({ 'mongo delete error ': error });
        }
    });
    res.json({ 'REMOVED': req.params.id });
}
function AddPost(req, res) {
    const post = req.body;
    post.id = shortid.generate();
    db.query('INSERT INTO posts values (?,NULL,?,?)', [
        post.id,
        post.title,
        post.body
    ], (error) => {
        if (error) {
            res.json({ 'mysql insert error ': error });
        }
    });
    Post.create(post, function (error) {
        if (error) {
            res.json({ 'mongo insert error ': error });
        }
    });
    res.json({ 'SUCCESS': post });
}
module.exports = router;
//# sourceMappingURL=posts.js.map