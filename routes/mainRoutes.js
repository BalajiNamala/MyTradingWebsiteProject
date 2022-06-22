const express=require('express');

const mainController=require('../controllers/mainController');

const mainRouter=express.Router();

mainRouter.get('/',mainController.index);

mainRouter.get('/contactus',mainController.contactPage);

mainRouter.get('/aboutus',mainController.aboutusPage);

mainRouter.get('/*',mainController.errorMessage);

module.exports = mainRouter;