const mongoose = require('mongoose');
const schema = mongoose.Schema;

const laneSchema=new schema({
    StartPoint:String,
    EndPoint:String,
    Distance:Number
});
module.exports = mongoose.model('Lanes', laneSchema);
