const mongoose = require('mongoose');
const schema = mongoose.Schema;


const consignerModel = new schema({
    Type:{ enum:['Enterprise', 'Broker','SMC','Transporter']},
    Name: String,
    PhoneNo: Number
});

module.exports = mongoose.model('Consigners',consignerModel);