// if (!process.env.APP_SECRET) throw new Error('you need an APP_SECRET env variable');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5555;
const yelp = require(__dirname + '/routes/yelp_router');
const userRouter = require(__dirname + '/routes/user_routes');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/utravel_db');

app.use('/yelp', yelp);
app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.send({ MSG: 'API' });
});


app.use(express.static(__dirname + '/build'));

module.exports = exports = app.listen(PORT, () => console.log('server up on port: ' + PORT));
