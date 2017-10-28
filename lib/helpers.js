 

exports.getError = function(kod,mesaj) {
  return {"success":false,"error":{"status":kod,"code":kod,"message":mesaj}};
   };

