const mongoose = require('mongoose');
const schema = mongoose.Schema;

const consignerModel = new schema({
    Type: String,
    Name: String,
    PhoneNo: [Number],
    Address: [String]
});

module.exports = mongoose.model('Consigners', consignerModel);
