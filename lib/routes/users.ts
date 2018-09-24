import  * as express from 'express';
import { UserSchema } from  '../models/user' ;
import * as mongoose from 'mongoose';

const shortid = require('shortid');
const router = express.Router();
const db = require  ('../database');
const User = mongoose.model('user', UserSchema);

router.get('/', FindAllUsers);
router.post('/', AddUser);
router.delete('/:id', DeleteUser);
router.put('/:id', UpdateUser);





function FindAllUsers(req, res, next)  {
  db.query('select * from  users', (error, rows, fields) => {
    if (error) {
      res.send('mysql Update error for user ');
      }
  res.json(rows);
  });
}
function UpdateUser (req, res, next) {
  const user = req.body;
  db.query('UPDATE users SET name=?, email=?,phone=? WHERE id=? ', [
    user.name,
    user.email,
    user.phone,
    req.params.id
  ], (err) => {
    if (err) {
    res.json({'mysql Update error for user ': user});
    }
})
User.findOneAndUpdate(req.params.id, req.body, function (err, post) {
  if (err) {
    res.json({'mysql Update error for user ': user});
    }
});
res.json({'UPDATED': user});
}

function  DeleteUser(req, res, next) {
  db.query('Delete from  users  where id=?', [req.params.id], (err, rows, fields) => {
    if (err) {
      res.json({'mysql Delete error for user ':  req.params.id});
      }
  })
  User.findOneAndRemove( {id: req.params.id}, function (err, user) {
    if (err) {
      res.json({'mongo delete error': err});
    }
  });
  res.json({'REMOVED': req.params.id});
}

function AddUser(req, res, next) {
  const user = req.body;
  const id = shortid.generate();
  db.query('INSERT INTO users values (?,?,NULL,?,?,?)', [
    id,
    user.name,
    user.email,
    user.phone,
    user.website,
  ], (err) => {
    if (err) {
      res.json({'mysql add  error': err});
    }
  })
  User.create(user, function (err) {
    if (err) {
      res.json({'mongo add error': err});
    }
    res.json({'SUCCESS': user});
  });
}

module.exports = router;

