const consignerController = require('../controllers/consignerController');
const router = require('express').Router();

router.post('/addConsigner', consignerController.addConsigner);
router.get('/getConsigners', async (req, res) => {
    try {
        let ctx = await consignerController.getConsigners();
        ctx(req, res);
    } catch (e) {
        console.log('Route is catching error', e);
        res.status(500).json(e);
    }
});

module.exports =router;
