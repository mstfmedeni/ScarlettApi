'use strict';

let Category = function(id,kod,shortName,name,aciklama,createdUser,updateUser,createdDate,updateDate){
  this.id = id;
  this.name = name;
  this.shortName = shortName;
  this.kod = kod;
  this.aciklama = aciklama;

  this.createdUser = createdUser;
  this.updateUser = updateUser; 
   this.createdDate = createdDate;
  this.updateDate = updateDate;
}

module.exports = Category;
