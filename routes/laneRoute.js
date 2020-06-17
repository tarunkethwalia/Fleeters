const router = require('express').Router();
const laneController = require('../controllers/laneController');

router.post('/addLane', laneController.addLane);

router.get('/getLanes', async (req, res) => {
    try {
        let ctx = await laneController.getLanes();
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching error', e);
        res.status(500).json(e);
    }
});

module.exports =router;