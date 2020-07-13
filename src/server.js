const express=require('express');
const session = require('express-session');
const app = express();
const bcrypt=require('bycrypt');
const mongoose = require('mongoose');
const User = require('./models/User');
const router = express.Router();
const MongoStore = require('connect-mongo')(session);
//Conectando a la base de datos para sesiones
mongoose.connect('mongodb://localhost/session')
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err))

    mongoose.Promise = global.Promise;
    const db = mongoose.connection;

    app.use(cookieParser());
    app.use(session({
        secret: 'borasa',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: db })
    }));

mongoose.Promise = global.Promise;
const db = mongoose.connection;

//Inicio de la app

router.get('/',(req,res) => {
    let sess = req.session;
    if(sess.email) {
        return res.redirect('/admin');//Ya logueado
    }

});

router.post("/user/register",async (req,res)=>{

  const user=User.find(req.body.email);
  if(user==null){
    try {
      const user=new User(req.body);
      user.credentials.contrasenia= await bycrypt.hash(req.body.password,10);
      user.save();
      req.session.email = req.body.email;
      res.redirect('/Admin');
    } catch (e) {
      console.log(e);
      res.redirect('/');
    }

  }
  else{
    alert("Usuario ya creado");
    res.redirect('/');
  }
});

router.post('/user/login', async(req,res)=>{

  const user=User.find(req.body.email);
    if(user==null){
      return res.status(500);
    }
    else{
      try{
        if(await bcrypt.compare(req.body.password,user.password)){
          res.send('Success');
          req.session.email = req.body.email;
      }
            else  {
              res.send("La contrasenia no coincide");
            }}
      catch (e ){
        return res.status(500);
      }}
    });

  router.get('/logout',(req,res) => {
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.redirect('/');
        });

    });
