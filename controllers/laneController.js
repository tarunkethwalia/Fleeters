const response = require('../utils/http-utils');
const laneModel = require('../models/laneModel');

exports.addLane = (req, res) => {

    const Lane = new laneModel({
        Route: req.body.Route,
        StartPoint: req.body.StartPoint,
        EndPoint: req.body.EndPoint,
        Distance: req.body.Distance
    });
    Lane.save().then(data => {
        res.status(200).json({message: "Data saved successfully", data: data});
    }).catch(error => {
        res.status(400).json({message: "Error Found", error: error});
    })

};

exports.getLanes =async () =>{
    try{
        let Lanes =await laneModel.find({});
        return response.Ok(Lanes);
    }
    catch(e){
        return response.BadRequest(e);
    }
};
