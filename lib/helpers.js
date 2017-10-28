 

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

