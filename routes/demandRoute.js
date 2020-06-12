const router = require('express').Router();
const demandController = require('../controllers/demandController');

router.post('/createDemand', demandController.createDemand);

router.post('/addConsigner', demandController.addConsigner);


// router.get('/allDemands', async(req,res)=>{
//
//     try{
//         let ctx=await demandController.allDemands();
//         ctx(req,res);
//     }
//     catch(e){
//         console.log('Route is catching error',e);
//         res.status(500).json(e);
//     }
// });
//
router.get('/getConsigner', async (req, res) => {
    try {
        let ctx = await demandController.activeDemands();
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching error', e);
        res.status(500).json(e);
    }

});


router.get('/activeDemands', async (req, res) => {
    try {
        let ctx = await demandController.activeDemands();
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching error', e);
        res.status(500).json(e);
    }

});

module.exports = router;