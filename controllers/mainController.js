const model=require('../models/tradeModel');

exports.index=(req,res)=>{
    let path='index.css';
    res.render('index.ejs',{css: path});
};
exports.contactPage = (req,res)=>{
    let path='displayPage.css';
    res.render('contactus.ejs',{css:path});
};

exports.aboutusPage = (req,res)=>{
    let path='displayPage.css';
    res.render('aboutus.ejs',{css:path});
};

exports.errorMessage = (req,res,next) =>{
    let error=new Error("The server cannot locate "+req.url);
    error.status=404;
    next(error);
};