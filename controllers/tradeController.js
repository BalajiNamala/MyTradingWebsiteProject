const model=require('../models/tradeModel');
const mongoose = require('mongoose')


exports.trades=(req,res) =>{
    model.find()
    .then(trader=>{
        let path='trades.css';
        res.render('trades.ejs',{tradeData: trader, css:path});
    })
    .catch(err=>next(err));
};

exports.trade= (req,res,next) =>{
    let id=req.params.id;
    if(!id.match(/^[0-9a-zA-Z]{24}$/)){
        let err = new Error('Cannot find trade with that id'+id);
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(trader=>{
        if(trader){
            let path='trade.css';
            res.render('trade.ejs',{tradeData: trader,css: path});
        }
        else{
            let err = new Error('No trade exists with that id:'+id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req,res,next) => {
    let id=req.params.id;
    if(!id.match(/^[0-9a-zA-Z]{24}$/)){
        let err = new Error('Cannot find trade with that id'+id);
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(trader=>{
        if(trader){
            let path='newtrade.css';
            res.render('edit.ejs',{tradeData: trader,css: path});
        }
        else{
            let err = new Error('No trade exists with that id:'+id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};


exports.update= (req,res,next)=>{
    let id=req.params.id;
    let trader=req.body;
    if(!id.match(/^[0-9a-zA-Z]{24}$/)){
        let err = new Error('Cannot find trade with that id'+id);
        err.status = 400;
        return next(err);
    }
    model.findByIdAndUpdate(id,trader,{useFindAndModify:false, runValidators: true})
    .then(card=>{
        if(card){
            res.redirect('/trade/'+id);
        }
        else{
            let err = new Error('No trade exists with that id: '+id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status= 400;
        }
        next(err);
    });
};

exports.delete = (req,res,next) =>{
    let id=req.params.id;
    if(!id.match(/^[0-9a-zA-Z]{24}$/)){
        let err = new Error('Cannot find trade with that id'+id);
        err.status = 400;
        return next(err);
    }
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(trader=>{
        if(trader){
            res.redirect('/trades');
        }
        else{
            let err = new Error('No trade exists with that id: '+id);
            err.status = 404;
            next(err);
        }
    })
};

exports.newTrade = (req,res) =>{
    let path='newTrade.css';
    res.render('newTrade.ejs',{css: path});
};

exports.createTrade= (req,res,next) =>{
    req.body._id = new mongoose.Types.ObjectId();
    req.body.image = '/images/' + req.body.image;
    let trade=new model(req.body);
    trade.save()
    .then(cards=>{res.redirect('/trades');})
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status=400;
        }
        next(err);
    })
};


exports.errorMessage = (req,res,next) =>{
    let error=new Error("The server cannot locate "+req.url);
    error.status=404;
    next(error);
};