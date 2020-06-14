const router = require('express').Router();
const demandController = require('../controllers/demandController');
const consignerController = require('../controllers/consignerController');

router.post('/createDemand', demandController.createDemand);
router.post('/addConsigner', consignerController.addConsigner);
router.post('/addLane', demandController.addLane);
router.put('/:demandId/changeDemandStatus', async (req, res) => {

    try {
        let ctx = await demandController.changeDemandStatus(req.params.demandId, req.body.demandStatus.status, req.body.demandStatus.reason);
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching error', e);
        res.status(500).json(e);
    }
});


router.get('/getConsigners', async (req, res) => {
    try {
        let ctx = await consignerController.getConsigners();
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching error', e);
        res.status(500).json(e);
    }
});

router.get('/getLanes', async (req, res) => {
    try {
        let ctx = await demandController.getLanes();
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

router.get('/inactiveDemands', async (req, res) => {
    try {
        let ctx = await demandController.inactiveDemands();
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching error', e);
        res.status(500).json(e);
    }
});

router.get('/rejectedDemands', async (req, res) => {
    try {
        let ctx = await demandController.rejectedDemands();
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching error', e);
        res.status(500).json(e);
    }
});

router.get('/pendingDemands', async (req, res) => {
    try {
        let ctx = await demandController.pendingDemands();
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching error', e);
        res.status(500).json(e);
    }
});

router.get('/completedDemands', async (req, res) => {
    try {
        let ctx = await demandController. completedDemands();
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching error', e);
        res.status(500).json(e);
    }
});

router.get('/allDemands', async (req, res) => {
    try {
        let ctx = await demandController.allDemands();
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching error', e);
        res.status(500).json(e);
    }

});


module.exports = router;