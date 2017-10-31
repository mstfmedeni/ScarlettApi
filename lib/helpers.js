 

var bcrypt = require('bcrypt');


exports.getError = function(kod,mesaj) {
  return {"success":false,"error":{"status":kod,"code":kod,"message":mesaj}};
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


