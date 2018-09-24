"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.CommentSchema = new mongoose.Schema({
    id: String,
    name: String,
    // tslint:disable-next-line:object-literal-sort-keys
    email: String,
    body: String,
    postId: String,
});
//# sourceMappingURL=comment.js.map