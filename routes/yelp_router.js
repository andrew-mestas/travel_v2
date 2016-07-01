'use strict';
const Yelp = require("yelp");
const Router  = require('express').Router();
const bodyParser = require('body-parser').json();
const jwToken = require(__dirname + '/../lib/jwt_auth');
const async = require('async');
const testData = require('./test');

let yelpRouter = module.exports = Router;

yelpRouter.route("/")

.get((req, res)=>{
    res.status(200).json({yelp: "Yelp api"})
});


yelpRouter.route("/search")

.post(bodyParser, (req, res) => {
    let yelp = new Yelp({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_SECRET,
    });
    let search = req.body.query;
    let rating = req.body.rating;
    let categories = req.body.category;

    let results = [];
  
    search = typeof(search) === 'string' ? [search] : search;
// For async map function searches yelp
    let yelpSearchFn = (data, callback) => {
    yelp.search({term: data.term, location: data.location, cl:data.latitude + "," + data.longitude})
       .then(function (data) {
        callback(null, data);
      })
      .catch(function (err) {
        console.error(err);
      });
    }

// creates array of businesses in order by rating and status open 
  async.map(search, yelpSearchFn, (err, results)=> {
    let openBusinessesAscendingArray= results.map((x)=>{
      return x.businesses.sort((business1, business2)=>{
        return business2.rating - business1.rating})
               .filter((business)=>{return (!business.is_closed && business.rating > rating)});
  });

// For every category provided will step through and create routes

  // Object.keys(categories).map((x)=>{
  //   openBusinessesAscendingArray[categories[x]]


  // });


  res.status(200).json(openBusinessesAscendingArray);

});

});
