const mongoose = require('mongoose');
const schema = mongoose.Schema;

const laneSchema = new schema({
    StartPoint: String,
    EndPoint: String,
    Distance: String
});

const addressSchema = new schema({
    LoadingAddress:[{Address:String,POC:[{Name:String,PhoneNo:Number}]}],
    UnLoadingAddress:[{Address:String,POC:[{Name:String,PhoneNo:Number}]}]
    }
);

const vehicleSchema = new schema({
    vehicleType: {enum:['Open','Container','Trailer']},
    Tyres: Number,
    Height: Number,
    HQ: {type: Boolean, default: false},
    TruckType:{ enum :['MXL', 'SXL', 'TXL']}
});


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
    Consigner:{Name:String,Type:String,PhoneNo:[Number]},
    demandStatus: {enum:['Active', 'Completed', 'Rejected','Pending']},  //active or completed or unactive-[rejected,pending or on hold]
    Lane: laneSchema,
    Address: addressSchema,
    Item: {Commodity:String, Tonnage:Number},
    Time: timeSchema,
    Vehicle: vehicleSchema,
    Freight: freightSchema
});

module.exports = mongoose.model('Demands',demandModel);
