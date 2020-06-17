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

exports.getConsigners =async () =>{
    try{
        let consigners =await consignerSchema.find({});
        return response.Ok(consigners);
    }
    catch(e){
        return response.BadRequest(e);
    }
};

