const express = require('express');
const router = express.Router();
const LocationController = require('../app/api/controllers/location');


// router.get('/', LocationController.getAll);
router.post('/get', LocationController.getByLocation);

module.exports = router;