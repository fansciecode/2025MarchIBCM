const express =require("express");
const router = express.Router();

const QueryController = require('../app/api/controllers/query');
const catController = require('../app/api/controllers/categories');

router.get('/tags/:tag',QueryController.EventByTag);
router.get('/location/:location', QueryController.EventByLocation);
router.get('/category/:category',QueryController.EventByCategory);

// category routes
router.get('/categories',catController.catList);
// router.post('/addCatgry',catController.addCat);
// router.get('/location&category')
module.exports= router;

