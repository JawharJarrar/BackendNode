import * as mongoose from 'mongoose';
export const CommentSchema = new mongoose.Schema({
  id: String,
  name: String,
  // tslint:disable-next-line:object-literal-sort-keys
  email: String,
  body: String,
  postId: String,
});
