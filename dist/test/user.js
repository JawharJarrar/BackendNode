"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const db = require('../database');
const mongoose = require("mongoose");
const user_1 = require("../models/user");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
require("mocha");
const should = chai.should();
const User = mongoose.model('User', user_1.UserSchema);
/**
 *  users api  unit tests
 */
describe('Users', function () {
    User.collection.drop();
    db.query('DELETE  FROM users');
    beforeEach(function (done) {
        User.create({ name: 'jack',
            email: 'Script@gmail.com',
            phone: '50729254',
            website: 'slack.com',
            id: '77' });
        db.query('INSERT INTO users values (?,?,NULL,?,?,?)', [
            '77',
            'jack',
            'jack',
            'jack',
            'jack.com',
        ]);
        done();
    });
    afterEach(function (done) {
        User.collection.drop();
        db.query('DELETE  FROM users');
        done();
    });
    it('should delete a SINGLE user on /users/<id> DELETE', function (done) {
        chai.request(app_1.default)
            .get('/users')
            .end(function (err, res) {
            chai.request(app_1.default)
                .del('/users/' + res.body[0].id)
                .end(function (error, response) {
                response.should.have.status(200);
                should.exist(res.body);
                // tslint:disable-next-line:no-unused-expression
                response.should.be.json;
                response.body.should.have.property('REMOVED');
                done();
            });
        });
    });
    it('should update a SINGLE user on /users/<id> PUT', function (done) {
        chai.request(app_1.default)
            .get('/users')
            .end(function (err, res) {
            chai.request(app_1.default)
                .put('/users/' + res.body[0].id)
                .send({ 'name': 'Java',
                'email': 'Script@gmail.com',
                'phone': '50729254',
                'website': 'slack.com'
            })
                .end(function (error, response) {
                response.should.have.status(200);
                should.exist(res.body);
                // tslint:disable-next-line:no-unused-expression
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('UPDATED');
                response.body.UPDATED.should.be.a('object');
                done();
            });
        });
    });
    it('should list ALL users on /users GET', function (done) {
        chai.request(app_1.default)
            .get('/users')
            .end(function (err, res) {
            res.should.have.status(200);
            // tslint:disable-next-line:no-unused-expression
            res.should.have.json;
            res.body.should.be.a('array');
            done();
        });
    });
    it('should add a SINGLE user on /users POST', function (done) {
        chai.request(app_1.default)
            .post('/users')
            .send({ 'name': 'Java',
            'email': 'Script@gmail.com',
            'phone': '50729254',
            'website': 'slack.com' })
            .end(function (err, res) {
            res.should.have.status(200);
            // tslint:disable-next-line:no-unused-expression
            res.should.have.json;
            res.body.should.be.a('object');
            res.body.should.have.property('SUCCESS');
            res.body.SUCCESS.should.be.a('object');
            done();
        });
    });
});
//# sourceMappingURL=user.js.map