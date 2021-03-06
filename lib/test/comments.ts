import app from '../app';
import * as mongoose from 'mongoose';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { CommentSchema } from  '../models/comment' ;

chai.use(chaiHttp);
const  should =  chai.should();
const  db = require('../database');
const Comment = mongoose.model('Comment', CommentSchema);

/**
 * comment apis  unit tests
 */
describe('Comments', function() {
  Comment.collection.drop();
  db.query('DELETE  FROM comments');
  beforeEach(function(done) {
    Comment.create({ name: 'comment',
     email: 'comment@gmail.com',
      body: 'comment@gmail.com',
      id: '66'});
    db.query('INSERT INTO comments values (?,?,?,?,?)', [
      '66',
      '47',
      'comment',
      'comment@gmail.com',
      'comment@gmail.com',
    ]);
    done();
  });
  afterEach(function(done) {
    Comment.collection.drop();
    db.query('DELETE  FROM comments');
    done();
  });

  it('should delete a SINGLE comment on /comments/<id> DELETE', function(done) {
    chai.request(app)
    .del('/comments/' + 66)
    .end(function(error, response) {
      response.should.have.status(200);
      // tslint:disable-next-line:no-unused-expression
      response.should.be.json;
      response.body.should.have.property('REMOVED');
      done();
    });
  });

  it('should add a SINGLE comment on /comments to a post', function(done) {
    chai.request(app)
    .post('/comments')
    .send({'name': 'comment',
    'email': 'comment@gmail.com',
    'body': 'comment@gmail.com',
    'postId': '14'})
    .end(function(err, res) {
      res.should.have.status(200);
      // tslint:disable-next-line:no-unused-expression
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.be.a('object');
      done();
    });
  });

  it('should update a SINGLE comments on /comments/<id> PUT', function(done) {
    chai.request(app)
    .put('/posts/' + 66)
    .send({'name': 'comment',
    'email': 'comment@gmail.com',
    'body': 'comment@gmail.com',
    'postId': '14'})
    .end(function(error, response) {
      response.should.have.status(200);
      // tslint:disable-next-line:no-unused-expression
      response.should.be.json;
      response.body.should.be.a('object');
      response.body.should.have.property('UPDATED');
      response.body.UPDATED.should.be.a('object');
      done();
    });
  });
});
