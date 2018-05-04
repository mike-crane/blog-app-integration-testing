'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

const {BlogPost} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

// inserts 10 blog post documents into the database
function seedBlogPostData() {
  console.info('seeding blog post data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateBlogPostData());
  }
  // returns a promise
  return BlogPost.insertMany(seedData);
}

// generates an object representing a blog post
function generateBlogPostData() {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.sentences(),
    author: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    },
    published: faker.date.past()
  };
}

// zeros out the database
function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('Blog posts API resource' function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });
  
  beforeEach(function() {
    return seedBlogPostData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });
  
});