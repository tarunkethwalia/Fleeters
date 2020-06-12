const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Demands = require('../models/demandModel');
const consignerSchema = require('../models/consignerModel');
const response = require('../utils/http-utils');
exports.addConsigner = (req, res) => {

    const consigner = new consignerSchema({
        Name: req.body.Name,
        Type: req.body.Type,
        PhoneNo: req.body.PhoneNo,
        Address: req.body.Address
    });
    consigner.save().then(data => {
        res.status(200).json({message: "Data saved successfully", data: data});
    }).catch(error => {
        res.status(401).json({message: "Error Found", error: error});
    })
};
exports.createDemand = (req, res) => {

    const consigner = {
        Name: req.body.Consigner.Name,
        Type: req.body.Consigner.Type,
        PhoneNo: req.body.Consigner.PhoneNo,
        Address: req.body.Consigner.Address
    };


    const lane = {
        StartPoint: req.body.Lane.StartPoint,
        EndPoint: req.body.Lane.EndPoint,
        Distance: req.body.Lane.Distance
    };

    const address = {
        LoadingAddress: req.body.Address.LoadingAddress,
        UnLoadingAddress: req.body.Address.UnLoadingAddress
    };

    const time = {
        IndentTime: req.body.Time.IndentTime,
        ClosingTime: req.body.Time.ClosingTime,
        LoadingTime: req.body.Time.LoadingTime,
        TAT: req.body.Time.TAT
    };
    const vehicle = {
        vehicleType: req.body.Vehicle.vehicleType,
        Tyres: req.body.Vehicle.Tyres,
        Height: req.body.Vehicle.Height,
        HQ: req.body.Vehicle.HQ,
        TruckType: req.body.Vehicle.TruckType
    };

    const freight = {
        Amount: req.body.Freight.Amount,
        Advance: req.body.Freight.Amount,
        Percentage: req.body.Freight.Percentage
    };

    const demand = new Demands({
        Consigner: consigner,
        Lane: lane,
        Address: address,
        Item: {Commodity: req.body.Item.Commodity, Tonnage: req.body.Item.Tonnage},
        Time: time,
        Vehicle: vehicle,
        Freight: freight

    });

    demand.save().then(data => {
        res.status(200).json({message: "Data saved successfully", data: data});
    }).catch(error => {
        res.status(401).json({message: "Error Found", error: error});
    })

};

// exports.allDemands =async()=>{
//
// };
//
exports.activeDemands = async () => {
    try {
        let demands = await Demands.find({demandStatus: "Active"});
        return response.Ok(demands);
    } catch (e) {
        return response.BadRequest(e);
    }
};