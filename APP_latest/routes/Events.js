const express = require('express');
const router = express.Router();
const EventController = require('../app/api/controllers/Events');


router.get('/', EventController.getAll);
router.post('/create', EventController.create);
router.get('/:eventId', EventController.getById);
router.put('/:eventId', EventController.updateById);
router.delete('/:eventId', EventController.deleteById);

module.exports = router;