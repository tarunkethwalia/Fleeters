const mongoose = require('mongoose');
const schema = mongoose.Schema;

const laneSchema = {
    Route:String,
    StartPoint: String,
    EndPoint: String,
    Distance: String
};

const addressSchema = {
    LoadingAddress: [{Address: String, POC: [{Name: String, PhoneNo: [Number]}]}],
    UnLoadingAddress: [{Address: String, POC: [{Name: String, PhoneNo: [Number]}]}]
}


const vehicleSchema = {
    vehicleType:String,
    Tyres: Number,
    Height: Number,
    HQ: {type: Boolean, default: false},
    TruckType:{type:String,default:"Not Applicable"}
};


const timeSchema = new schema({
    IndentTime: String,
    ClosingTime: String,
    LoadingTime: String,
    TAT: String
});

const freightSchema =new schema({
    Amount:Number,
    Advance:Number,
    Percentage: Number
});

const demandModel = new schema({
    Consigner: {Name: String, Type: String, PhoneNo: [Number] ,Address:[String]},
    demandStatus: {status:{type:String,default:"Active"}, reason:{type:String,default:null} },
    Lane: laneSchema,
    Address: addressSchema,
    Item: {Commodity: String, Tonnage: Number},
    Time: timeSchema,
    Vehicle: vehicleSchema,
    Freight: freightSchema
});

module.exports = mongoose.model('Demands', demandModel);
