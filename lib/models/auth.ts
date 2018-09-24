import * as mongoose from 'mongoose';
export const AuthSchema = new mongoose.Schema({
  id: String,
  username: String,
  // tslint:disable-next-line:object-literal-sort-keys
  email: String,
  password: String,
});
