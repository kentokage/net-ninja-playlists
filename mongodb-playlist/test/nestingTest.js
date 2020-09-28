const assert = require('assert');
const Author = require('../models/author');
const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;
Mongoose.set('useFindAndModify', false);

describe('Nesting records', function() {
  
  // also can drop database in beforeEach
  /* mongooose.connection.collections.authors.drop(function(done) {
      done();
    })
  */

  beforeEach(function() {
    var pat = new Author({
      name: 'Patrick Rothfuss',
      age: '100',
      books: [
        {title: 'Name of the Wind', pages: 400},
        {title: 'Cool book name', pages: 500}
      ]
    })

    return pat.save();
  });

  afterEach(function() {
    return Author.findOneAndRemove({name: 'Patrick Rothfuss'});
  });

  // create test
  it('create an author with sub-documents', done => {
    Author.findOne({name: 'Patrick Rothfuss'}).then(record => { 
      assert(record.books.length === 2);
      done();
    });
  })

  // add a book
  it('add book to an author', done => {
    Author.findOne({name: 'Patrick Rothfuss'}).then(record => {
      record.books.push({
        title: 'Wise Mans Fear', pages: 500
      });
      return record.save();
    }).then(() => {
      return Author.findOne({name: 'Patrick Rothfuss'});
    }).then(record => {
      assert(record.books.length === 3);
      done();
    })
  });

})