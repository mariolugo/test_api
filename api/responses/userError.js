/**
 * 201 (Created) Response
 * Successful creation occurred (via either POST or PUT).
 * Set the Location header to contain a link 
 * to the newly-created resource (on POST).
 * Response body content may or may not be present.
 */
module.exports = function (data, code, message, root) {
  var response = _.assign({
    code: code || 'EMAIL_EXISTS',
    message: message 
       || 'That email is already taken'
  }, root);
 
  this.req._sails.log.silly('Sent (400 CREATED)\n', response);
 
  this.res.status(400);
  this.res.jsonx(response);
};