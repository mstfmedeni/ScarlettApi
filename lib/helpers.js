 

var bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

exports.getLoginUser = function(req,result,err){
  var token = req.body.auth_key || req.headers['auth_key'];
   if (token){
     jwt.verify(token,process.env.SECRET_KEY,function(err,decode){
      if(err){
           err('doğrulama kodu hatalı');
        }else{
          result(decode);
      }
    })
  }
}



exports.getIpAdress = function(req){
  return req.connection.remoteAddress;
}
exports.getIpKontrol = function(req){
  let ip = this.getIpAdress(req)
  if (ip!=process.env.ipAdress&&ip!='::1')
    return true;
   else
    return false;
}

exports.getError = function(kod,mesaj) {
  return {"success":false,"error":{"status":kod,"code":kod,"message":mesaj}};
   };

   exports.getError = function(kod,mesaj,err) {
    return {"success":false,"error":{"status":kod,"code":kod,"message":mesaj,"SYSmessage":err}};
     };

   exports.getPer = function(){
    return 100;
   };
   function getPerPage(){
     return 100;
   }

   exports.getPage = function(page){
    if(page){
      var pg = parseInt(page);
       pg = pg - 1;
      pg = pg*getPerPage();
      return pg;
    }else{
      return 0;
    }
   };
   exports.getPass = function(hash){
     let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(hash,salt);
   };
   exports.comparePass = function(hash,pass){
    return bcrypt.compareSync(hash,pass);
  };
   
   exports.cryptPassword = function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
     if (err) 
       return callback(err);
 
     bcrypt.hash(password, salt, function(err, hash) {
       return callback(err, hash);
     });
   });
 };
 
 exports.comparePassword = function(plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
        return err == null ?
            callback(null, isPasswordMatch) :
            callback(err);
    });
 };


