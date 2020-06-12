const mongoose =require('mongoose');
const schema = mongoose.Schema;
const Demands=require('../models/demandModel');

exports.createDemand = (req,res) => {

    const consigner = {
    Name:req.body.Name,
    Type:req.body.Type,
    PhoneNo:req.body.PhoneNo
    };


    const lane ={
    StartPoint : req.body.StartPoint,
    EndPoint   : req.body.EndPoint,
    Distance   : req.body.Distance
    };

    const address ={
        LoadingAddress:[{Address:req.body.Address,POC:[{Name:req.body.Name,PhoneNo:req.body.PhoneNo}]}],
        UnLoadingAddress:[{Address:req.body.Address,POC:[{Name:req.body.Name,PhoneNo:req.body.PhoneNo}]}]
    };

    const time={
        IndentTime :req.body.IndentTime,
        ClosingTime:req.body.ClosingTime,
        LoadingTime:req.body.LoadingTime,
               TAT :req.body.TAT
    };
    const vehicle = {
        vehicleType: req.body.vehicleType,
        Tyres: req.body.Tyres,
        Height: req.body.Height,
        HQ: {type: req.body.HQ},
        TruckType: req.body.TruckType
    };

    const freight={
        Amount:req.body.Amount,
        Advance:req.body.Advance,
        Percentage:req.body.Percentage
    };

    const demand = new Demands({

        Consigner: consigner,
        Lane     : lane,
        Address  : address,
        Item     : {Commodity:req.body.Commodity,Tonnage:req.body.Tonnage},
        Time     : time,
        Vehicle  : vehicle,
        Freight  : freight

    });

    demand.save().then(data=>{
        res.status(200).json({message: "Data saved successfully",data: data});
    }).catch(error=>{
        res.status(401).json({message: "Error Found",error: error});
    })

};


// exports.allDemands =async()=>{
//
// };
//
// exports.activeDemands =async()=>{
//
// };