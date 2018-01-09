var mongoose = require('mongoose');
var crypto = require('crypto');
var user = require('../models/User');


exports.taodiachi= function (req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id);
    User.findOne({"_id": id}, function (err, result) {
        if (err) {
            return res.status(500).send();
        } else {
            if (!result) {
                return res.status(404).send();
            } else {
                return res.send(200, result.address);
            }
        }
    })
}
