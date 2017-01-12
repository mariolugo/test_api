/**
 * Products.js
 *
 * @description :: TODO: Attributes for product model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: 'email',
      required: true,
      unique: true
    },
    description: {
      type: 'text',
      required: true
    },
    photo:{
      type: 'string',
      required: true
    },
    user:{
      model: 'user'
    }
  }
};

