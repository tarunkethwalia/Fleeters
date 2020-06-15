const mongoose = require('mongoose');
const schema = mongoose.Schema;
const moment =require('moment');

const laneSchema = {
    Route:{type:schema.Types.String,required:true},
    StartPoint: {type:schema.Types.String,required:true},
    EndPoint: {type:schema.Types.String,required:true},
    Distance: {type:schema.Types.String,required:true}
};

const addressSchema = {
    LoadingAddress: [{Address:{ type:schema.Types.String,required:true}, POC: [{Name: String, PhoneNo: [Number]}]}],
    UnLoadingAddress: [{Address: {type:schema.Types.String}, POC: [{Name: String, PhoneNo: [Number]}]}]
}

const vehicleSchema = {
    vehicleType:{type:schema.Types.String,required:true},
    Tyres: {type:schema.Types.Number,required:true},
    Height: {type:schema.Types.Number},
    HQ: {type: schema.Types.Boolean, default: false},
    TruckType:{type:schema.Types.String,default:"Not Applicable"}
};


const timeSchema = new schema({
    IndentTime: {type:schema.Types.Date,default:moment.utc()},
    ClosingTime: {type:schema.Types.Date,required:true},
    LoadingTime: {type:schema.Types.Date,required:true},
    TAT: {type:schema.Types.Number,required:true}
});

const freightSchema =new schema({
    Amount:{type:schema.Types.Number,required:true},
    Advance:{type:schema.Types.Number,required:true},
    Percentage: {type:schema.Types.Number}
});

const demandModel = new schema({
    Consigner: {Name: {type:schema.Types.String,required:true}, Type:{ type:schema.Types.String,required:true}, PhoneNo: [Number] ,Address:[String]},
    demandStatus: {status:{type:String,default:"Active"}, reason:{type:String,default:null} },
    Lane: laneSchema,
    Address: addressSchema,
    Item: {Commodity: {type:schema.Types.String,required:true}, Tonnage: {type:schema.Types.Number,required:true}},
    Time: timeSchema,
    Vehicle: vehicleSchema,
    Freight: freightSchema
});

module.exports = mongoose.model('Demands', demandModel);
