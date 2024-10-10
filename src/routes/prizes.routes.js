const express = require('express');
const router = express.Router();
const prizesController = require('../prizesController')


router.get('/get', prizesController.getPrizes);
router.post('/claim', prizesController.claimPrize);
router.post('/update', prizesController.updateStock);

module.exports = router