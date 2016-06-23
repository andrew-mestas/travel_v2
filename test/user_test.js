const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const expect = chai.expect;
const should = chai.should();

// const User = require("../models/User.js");

chai.use(chaiHttp);


// describe('User', function() {
// 	// User.collection.drop();
// 	  beforeEach(function(done){
// 	  	// User.remove({username: 'DeleteMe'}, function(err){

// 	  	// })
// 	  	done();
// 	  });
// 	  // afterEach(function(done){
// 	  //   // User.collection.drop();
// 	  //    done();
// 	  // });
// });

