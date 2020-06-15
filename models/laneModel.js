const mongoose = require('mongoose');
const schema = mongoose.Schema;

const laneSchema=new schema({
    Route:{type:schema.Types.String,required:true},
    StartPoint:{type:schema.Types.String,required:true},
    EndPoint:{type:schema.Types.String,required:true},
    Distance:{type:schema.Types.Number,required:true}
});
module.exports = mongoose.model('Lanes', laneSchema);
