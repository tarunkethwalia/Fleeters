const mongoose = require('mongoose');
const schema = mongoose.Schema;

const consignerModel = new schema({
    Type: {type:schema.Types.String,required:true},
    Name: {type:schema.Types.String,required:true},
    PhoneNo: [Number],
    Address: [String]
});

module.exports = mongoose.model('Consigners', consignerModel);
