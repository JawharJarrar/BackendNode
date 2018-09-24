import * as mongoose from 'mongoose';

export const  UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  username: String,
  // tslint:disable-next-line:object-literal-sort-keys
  email: String,
  phone: String,
  website: String,
  company: {
    bs: String,
    catchPhrase: String,
    name: String,
  },
  address: {
    street: String,
    suite: String,
    // tslint:disable-next-line:object-literal-sort-keys
    city: String,
    zipcode: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
});
