const passport=require('passport');
const Cred=require('../models/Credential');
const Organizacion= require('../models/Organization');
const Usuario= require('../models/User');
const bcrypt=require('bcryptjs');
const { render } = require('ejs');

exports.postSignupOrg= async (req,res,next)=>{ //Se llamara desde otro lado dependiendo de que sea org o usuario
  const nuevaOrg= new Organizacion({
    name : req.body.name,
    telephone : req.body.telephone,
    webPage : req.body.webPage
  });
  const nuevoCred=new Cred({
    email : req.body.email,
    password : await bcrypt.hash(req.body.password, 10),
    foreignKey: nuevaOrg
  });

  Cred.findOne({email : req.body.email},(err, credsExistente)=>{
    if(credsExistente){
      return res.status.send('Ya esta regisrado');
    }
    nuevaOrg.save();
    nuevoCred.save((err)=>{
      if(err){
        next(err);
      }
      req.logIn(nuevoCred,(err)=>{
        if(err){
          next(err);
        }
        //nuevaOrg.save();
        //nuevoCred.save();
        //res.send("Usuario creado exitosamente");//Tambien aniadir enciar correo
        res.redirect('/');
      })
    })
  }


)
};

exports.postSignupUser= async (req,res,next)=>{ //Se llamara desde otro lado dependiendo de que sea org o usuario
  const nuevoUser= new Usuario({
    name : req.body.name,
    age : req.body.age
  });
  const nuevoCred=new Cred({
    email : req.body.email,
    password : await bcrypt.hash(req.body.password, 10),
    foreignKey: nuevoUser
  });

  Cred.findOne({email : req.body.email},(err, credsExistente)=>{
    if(credsExistente){
      return res.status.send('Ya esta registrado');
    }
    nuevoUser.save();
    nuevoCred.save((err)=>{
      if(err){
        next(err);
      }
      req.logIn(nuevoCred,(err)=>{
        if(err){
          next(err);
        }
        //nuevoUser.save();
        //nuevoCred.save();
        res.send("Usuario creado exitosamente");//Tambien aniadir enciar correo
      })
    })
  }
)};

exports.postLogin=(req,res,next)=>{
  passport.authenticate('local',(err,cred,info)=>{
    if(err){
      next(err);
    }
    if(!cred){
      return res.status(400).send('Email o contrasenia no valido');
    }
    req.logIn(cred,(err)=>{
      if(err){
        next(err);
      }
      res.send('LogIn exitoso');
    })
  })(req,res,next);
}

exports.logout= (req,res)=>{
  req.logout();
  res.send("Se ha cerrado correctamente la sesion");

}
