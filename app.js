const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
var path = require('path');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTION'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    
    next();
});

//Route which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//gawe halaman web
app.use('/cssFiles', express.static(__dirname + '/assets'));
app.get('/', function(req, res){
   res.sendFile('index.html', {root: path.join(__dirname, './render-html')}); 
});

app.get(/^(.+)$/, function(req, res){
    //console.log(req.params);
    try{
        if(fs.statSync(path.join(__dirname, './render-html', req.params[0]+ '.html')).isFile()){
            res.sendFile(req.params[0] + '.html' , {root: path.join(__dirname, './render-html')}); 
      }
    }
    catch(err){
        
        res.sendFile('404.html' , {root: path.join(__dirname, './render-html')}); 
    }
            
});

//gawe rest api
app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
   res.status(error.status  || 500);
   res.json({
       error:{
           message: error.message
       }
   });
});

module.exports = app;

