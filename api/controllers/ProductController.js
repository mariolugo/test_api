/**
 * ProductsController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var uuid = require('node-uuid');

module.exports = {
	/**
     * Create product, only photo
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    uploadPhoto:(req, res) => {
        var fileName = uuid.v4();
        var id = req.param('id');
        req.file('photo').upload({
            // don't allow the total upload size to exceed ~10MB
            maxBytes: 10000000,
            dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
            saveAs: `${fileName}.jpg`
        }, (err, uploadedFiles) => {
            if (err) {
                return res.negotiate(err);
            }
            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }
            Product.create({
                photo: `/images/${fileName}.jpg`,
                user: id
            }).exec((err,product)=>{
                res.ok({
                    id: product.id
                });
            })
            // Save the "fd" and the url where the avatar for a user can be accessed
        });
    },

     /**
     * Add product Info,
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    fillProduct: (req,res) =>{
        var productId = req.param('id');
        Product
            .update({
                id: productId
            },_.omit(req.allParams(), 'id'))
            .exec((err, product) => {
                if (err) return res.negotiate(err);
                if (!product) return res.notFound();
                Product.find()
                    .populate('user')
                    .exec((err, products) => {
                        res.ok({
                            'CODE': 'CREATED',
                            products: products
                        });
                    });
            });
    },

    /**
     * Add product info, product image already exists,
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    newProduct: (req, res) => {
        Product
            .create(_.omit(req.allParams(), 'id'))
            .exec((err, product) => {
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
     * delete product
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    deleteProduct: (req, res) => {
        Product
            .destroy({
                id: req.param('id')
            })
            .exec((err, product) => {
                if (err) return res.negotiate(err);
                if (product.length == 0) return res.notFound();
                Product.find()
                    .populate('user')
                    .exec((err, products) => {
                        res.ok({
                            'CODE': 'DELETED',
                            products: products
                        });
                    });
            });
    },
    /**
     * edit product
     * @param {Object} req Request object
     * @param {Object} res Response object
     */
    editProduct: (req, res) => {
        Product
            .update({
                id: req.param('id')
            }, _.omit(req.allParams(), 'id'))
            .exec((err, product) => {
                if (err) return res.negotiate(err);
                if (product.length == 0) return res.notFound();
                Product.find()
                    .populate('user')
                    .exec((err, products) => {
                        res.ok({
                            'CODE': 'EDITED',
                            products: products
                        });
                    });
            });
    }
};

