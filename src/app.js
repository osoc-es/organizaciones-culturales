const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const bodyparser = require('body-parser');

const app = express();
const mongoURI = 'mongodb://mongo:27017/osoc';

// connecting to db
const conn = mongoose.createConnection(mongoURI);

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI)
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err))
mongoose.connection.on('error', (err) => {
    throw err;
    process.exit(1);
})

app.use(session({
    secret: 'borasa',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ url: mongoURI, autoReconnect: true })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

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
