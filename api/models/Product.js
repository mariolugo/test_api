/**
 * Products.js
 *
 * @description :: TODO: Attributes for product model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: 'string',
    },
    description: {
      type: 'text',
    },
    photo:{
      type: 'text',
      required: true
    },
    user:{
      model: 'user'
    }
  }
};

