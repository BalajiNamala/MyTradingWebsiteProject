// const route = require('color-convert/route');
const express=require('express');

const tradeController=require('../controllers/tradeController');

const tradeRouter=express.Router();






tradeRouter.get('/',tradeController.trades);


tradeRouter.get('/:id/edit',tradeController.edit);

tradeRouter.delete('/:id/delete', tradeController.delete);

tradeRouter.get('/newTrade',tradeController.newTrade);

tradeRouter.get('/:id',tradeController.trade);

tradeRouter.post('/new',tradeController.createTrade);

tradeRouter.put('/:id',tradeController.update);

tradeRouter.get('/*',tradeController.errorMessage);
module.exports=tradeRouter;