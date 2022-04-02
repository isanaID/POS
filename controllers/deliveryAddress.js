const DeliveryAddress = require('../config/model/deliveryAddress');
const { subject } = require('@casl/ability');

const index = async (req, res, next) => {
    try {
        let { skip = 0, limit = 10 } = req.query;
        let deliveryAddress = await DeliveryAddress
        .find()
        .skip(parseInt(skip))
        .limit(parseInt(limit));
        return res.json(deliveryAddress);
    } catch (err) {
        next(err);
    }
};

const store = async (req, res, next) => {
    try {
        let payload = req.body;
        let user = req.user;
        let address = new DeliveryAddress({...payload, user: user._id});
        await address.save();
        return res.json(address);
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next (err);
    }
};

const update = async (req, res, next) => {
    try {
        let payload = req.body;
        let { id } = req.params;
        let address = await DeliveryAddress.findByIdAndUpdate(id, payload, {new: true, runValidators: true});
        return res.json(address);
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
    }
};

const destroy = async (req, res, next) => {
    try {
        let address = await DeliveryAddress.findByIdAndDelete(req.params.id);
        return res.json(`Address ${address.name} deleted`);
    } catch (err) {
        next(err);
    }
};



module.exports = {
    store,
    index,
    update,
    destroy
};