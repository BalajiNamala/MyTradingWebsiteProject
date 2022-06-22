const express=require('express');
const model=require('./models/tradeModel.js');
const methodOverride=require('method-override');
const controller=require('./controllers/tradeController');
const tradeRoute=require('./routes/tradeRoutes.js');
const mainRoute=require('./routes/mainRoutes.js');
const mongoose = require('mongoose');
const app=express();

let port =3000;
let host='localhost';

app.set('viewengine','ejs');

app.use(express.static('public'));


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/project3',
{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    app.listen(port, host, ()=>{
        console.log('Server is running on port ',port);
    });
})
.catch(err=>console.log(err.message));

app.use('/trade',tradeRoute);
app.use('/trades',tradeRoute);


app.use('/',mainRoute);




app.use((err,req,res,next)=>{
    if(!err.status){
        err.status=500;
        err.message=("Internal Server Error");

    }
    path='displayPage.css'
    res.status(err.status);
    res.render('error.ejs',{error:err,css: path});

});