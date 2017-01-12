/**
 * User.js
 *
 * @description :: TODO: Atributes of user model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    admin:{
      type: 'string',
      required: true
    },
    products: {
      collection: 'product',
      via: 'user'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    },
  },
  beforeUpdate: function (values, next) {
    CipherService.hashPassword(values);
    next();
  },
  beforeCreate: function (values, next) {
    CipherService.hashPassword(values);
    next();
  }
};

