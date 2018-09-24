"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.AuthSchema = new mongoose.Schema({
    id: String,
    username: String,
    // tslint:disable-next-line:object-literal-sort-keys
    email: String,
    password: String,
});
//# sourceMappingURL=auth.js.map