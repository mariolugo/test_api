/**
 * ProductsController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
     * Add new user
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    newProduct: (req,res)=>{
        Product 
            .create(_.omit(req.allParams(), 'id'))
            .exec((err,product) => {
                if (err) return res.negotiate(err);
                if (!product) return res.notFound();
                Product.find()
                .populate('user')
                .exec((err, products) => {
                    res.ok({
                        'CODE': 'CREATED',
                        users: products
                    });
                });
            });
    },
    /**
     * delete user
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    deleteProduct: (req, res) => {
        User
            .destroy({
                id: req.param('id')
            })
            .exec((err,product)=>{
                if (err) return res.negotiate(err);
                if (product.length == 0) return res.notFound();
                Product.find()
                .populate('user')
                .exec((err, products) => {
                    res.ok({
                        'CODE': 'DELETED',
                        users: products
                    });
                });
            });
    },
    /**
     * edit user
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    editProduct: (req,res) => {
        User
            .update({
                id: req.param('id')
            },_.omit(req.allParams(), 'id'))
            .exec((err,user) => {
                if (err) return res.negotiate(err);
                if (product.length == 0) return res.notFound();
                Product.find()
                .populate('user')
                .exec((err, products) => {
                    res.ok({
                        'CODE': 'EDITED',
                        users: products
                    });
                });
            });
    }
};

