'use strict';

const Auth = require('../../model/auth.js');
const server = require('../../lib/server.js');
const superagent = require('superagent');
const faker = require('faker');
require('jest');

describe('Auth POST', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  describe('Valid POST request and response', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/signup')
        .send(new Auth({
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
        }))
        .then(res => this.response = res);
    });
    test('should return a 201 status code', () => {
      expect(this.response.status).toBe(201);
    });
  });


  describe('Invalid POST request and response', () => {
    test('should return a 401 status code', () => {
      return superagent.post(':4000/api/v1/signup')
        .catch(err => expect(err.status).toBe(401));
    });
  });

  describe('Invalid POST request to wrong path', () => {
    test('should return a 404 status code', () => {
      return superagent.post(':4000/api/v1/signdown')
        .catch(err => expect(err.status).toBe(404));
    });
  });


});
