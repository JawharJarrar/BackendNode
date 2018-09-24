"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.PostSchema = new mongoose.Schema({
    id: String,
    userId: Number,
    // tslint:disable-next-line:object-literal-sort-keys
    title: String,
    body: String,
});
//# sourceMappingURL=post.js.map