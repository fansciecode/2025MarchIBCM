const catModel = require('../models/categories');
const userModel = require('../models/users');

module.exports = {
    catList: function (req, res, next) {
        catModel.find({}, function (err, categories) {
            if (err) {
                {
                    res.json({
                        eror: err
                    })
                }
            } else {
                res.json({
                    status: "success",
                    message: "categories found!!!",
                    data: {
                        categories: categories

                    }
                });
            }
        });
    }


}