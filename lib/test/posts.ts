import app from '../app';
import * as mongoose from 'mongoose';
import { PostSchema } from  '../models/post' ;
import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const  db = require('../database');
const  should =  chai.should();
const Post = mongoose.model('Post', PostSchema);
/**
 *  posts api  unit tests
 */
describe('Posts', function() {
  Post.collection.drop();
  db.query('DELETE  FROM posts');
  beforeEach(function(done) {
    Post.create({ title: 'jack', body: 'Script@gmail.com', id: ' 77'});
     db.query('INSERT INTO posts values (?,NULL,?,?)', [
        '77',
        'jack',
        'Script@gmail.com',
        ]);
    done();
  });

  afterEach(function(done) {
    Post.collection.drop();
    db.query('DELETE  FROM posts');
    done();
  });

  it('should delete a SINGLE post on /posts/<id> DELETE', function(done) {
    chai.request(app)
    .del('/posts/' + 77)
    .end(function(error, response) {
      response.should.have.status(200);
      // tslint:disable-next-line:no-unused-expression
      response.should.be.json;
      response.body.should.have.property('REMOVED');
      done();
    });
  });

  it('should list ALL posts on /posts GET', function(done) {
    chai.request(app)
    .get('/posts')
    .end(function(err, res) {
      res.should.have.status(200);
      // tslint:disable-next-line:no-unused-expression
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });

  it('should add a SINGLE post on /posts POST', function(done) {
    chai.request(app)
    .post('/posts')
    .send({'title': 'Java', 'body': 'Script@gmail.com'})
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

  it('should update a SINGLE posts on /posts/<id> PUT', function(done) {
    chai.request(app)
    .put('/posts/' + 77)
    .send({'title': 'Java', 'body': 'Script@gmail.com'})
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
