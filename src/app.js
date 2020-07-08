const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

// connecting to db
mongoose.connect('mongodb://localhost/osoc-test')
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err))

// import routes
const indexRoutes = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

// middlelware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', indexRoutes);

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on ${app.get('port')}`);
})