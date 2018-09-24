import * as mongoose from 'mongoose';
export const PostSchema = new mongoose.Schema({
  id: String,
  userId: Number,
  // tslint:disable-next-line:object-literal-sort-keys
  title: String,
  body: String,
});
