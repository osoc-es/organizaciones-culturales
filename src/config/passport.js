const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Cred=require('../models/Credential');

passport.serializeUser((cred,done)=>{
  done(null,cred._id);
})

passport.deserializeUser((id, done)=>{
  Cred.findById(id,(err,cred)=>{
    done(err,cred);
  })
})

passport.use(new LocalStrategy(
  {usernameField:'email'},
  (email,password,done)=>{
    Cred.findOne({email},(err, cred)=>{
      if(!cred){
        return done(null,false,{message:'Este email: ${email} no esta registrado'});
      }
      else{
        cred.compararPassword(password,(err,sonIguales)=>{
          if(sonIguales){
            return done(null,cred);
          }
          else{
            return done(null,false,{message:'La contrasenia no es correcta'});
          }
        })
      }
    })
  }
))

exports.estaAutenticado=(req,res,next)=>{
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.status(401).send('Necesitas Logearte para acceder a esta pagina');
  }
}
