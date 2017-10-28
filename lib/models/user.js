'use strict';

let User = function(id, name, shortName, shortKod, email, password, role, createdUser, updateUser){
  this.id = id;
  this.name = name;
  this.shortName = shortName;
  this.shortKod = shortKod;
  this.email = email;
  this.password = password;
  this.role = role;
  this.createdUser = createdUser;
  this.updateUser = updateUser;
}

module.exports = User;
