const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const assert = chai.assert;
const bcrypt = require('bcrypt');
const expect = chai.expect;
const app = express();
const router = require('../router.js');

chai.use(chaiHttp);

app.use('/', router);

describe('GET /garages', function () {
  it('should return a list of garages', function (done) {
    chai.request(app)
      .get('/garages')
      .end(function (err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.property(res.body[0], 'garage_id');
        assert.property(res.body[0], 'garage_name');
        done();
      });
  });
});

describe('GET /benefits', function () {
  it('should return a list of benefits', function (done) {
    chai.request(app)
      .get('/benefits')
      .end(function (err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.property(res.body[0], 'benefits_id');
        assert.property(res.body[0], 'benefits_name');
        assert.property(res.body[0], 'benefits_duration');
        done();
      });
  });
});

describe('GET /user', () => {
  it('devrait retourner un tableau de tous les utilisateurs sans garage', (done) => {
    chai.request(app)
      .get('/user')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        res.body.forEach((user) => {
          expect(user.garage_id).to.be.null;
        });
        done();
      });
  });
});


// describe('GET /appointment', function () {
//   it('should return a list of appointments', function (done) {
//     chai.request(app)
//       .get('/appointment')
//       .end(function (err, res) {
//         assert.isNull(err);
//         assert.equal(res.status, 200);
//         assert.isArray(res.body);
//         assert.property(res.body[0], 'fk_appointment_id');
//         assert.property(res.body[0], 'fk_garage_id');
//         assert.property(res.body[0], 'fk_user_id');
//         assert.property(res.body[0], 'fk_disponibility_id');
//         done();
//       });
//   });
// });


// describe('POST /signin', function () {
//   it('should return a token on successful signin', function (done) {
//     const saltRounds = 10;
//     const db = require('../data/items'); 
//     const mockUser = {
//       name: 'testuser',
//       password: 'testpassword',
//     };
//     db.run(
//       'INSERT INTO users (user_name, user_password) VALUES (?, ?)',
//       [mockUser.name, bcrypt.hashSync(mockUser.password, saltRounds)],
//       async function (err) {
//         if (err) {
//           console.log(err);
//           done(err);
//         }
//         const res = await chai
//           .request(app)
//           .post('/signin')
//           .send(mockUser);
//         assert.equal(res.status, 200);
//         assert.isObject(res.body);
//         assert.property(res.body, 'token');
//         assert.isString(res.body.token);
//         done();
//       }
//     );
//   });

//   it('should return an error message on incorrect username', function (done) {
//     const mockUser = {
//       name: 'nonexistentuser',
//       password: 'testpassword',
//     };
//     chai
//       .request(app)
//       .post('/signin')
//       .send(mockUser)
//       .end(function (err, res) {
//         assert.equal(res.status, 401);
//         assert.isString(res.body);
//         assert.equal(res.body, 'bad user');
//         done();
//       });
//   });

//   it('should return an error message on incorrect password', function (done) {
//     const saltRounds = 10;
//     const db = require('../data/items'); 
//     const mockUser = {
//       name: 'testuser',
//       password: 'wrongpassword',
//     };
//     db.run(
//       'INSERT INTO users (user_name, user_password) VALUES (?, ?)',
//       [mockUser.name, bcrypt.hashSync('testpassword', saltRounds)],
//       async function (err) {
//         if (err) {
//           console.log(err);
//           done(err);
//         }
//         const res = await chai
//           .request(app)
//           .post('/signin')
//           .send(mockUser);
//         assert.equal(res.status, 401);
//         assert.isString(res.body);
//         assert.equal(res.body, 'bad password');
//         done();
//       }
//     );
//   });
// });

