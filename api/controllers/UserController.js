/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
     * Add new user
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    newUser: (req,res)=>{
        User 
            .create(_.omit(req.allParams(), 'id'))
            .exec((err,user) => {
                if (err) return res.negotiate(err);
                if (!user) return res.notFound();
                User.find()
                .exec((err, users) => {
                    res.ok({
                        'CODE': 'CREATED',
                        users: users
                    });
                });
            });
    },
    /**
     * delete user
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    deleteUser: (req, res) => {
        User
            .destroy({
                id: req.param('id')
            })
            .exec((err,user)=>{
                if (err) return res.negotiate(err);
                if (user.length == 0) return res.notFound();
                User.find()
                .exec((err, users) => {
                    res.ok({
                        'CODE': 'DELETED',
                        users: users
                    });
                });
            });
    },
    /**
     * edit user
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    editUser: (req,res) => {
        User
            .update({
                id: req.param('id')
            },_.omit(req.allParams(), 'id'))
            .exec((err,user) => {
                if (err) return res.negotiate(err);
                if (user.length == 0) return res.notFound();
                User.find()
                .exec((err, users) => {
                    res.ok({
                        'CODE': 'EDITED',
                        users: users
                    });
                });
            });
    }
};

