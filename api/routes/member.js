const express = require('express');
const router = express.Router();
const db = require('./dbconnection');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:false}));

//Handler incoming GET request to /order haha
router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: "Order has fetched"
    });
});

router.post('/', (req,res,next)=>{
    console.log(req.body);
    db.query("INSERT INTO member (memberName, status, no_telp, pekerjaan) VALUES (?, ?, ?, ?)",
    [
        req.body.name,
        req.body.status,
        req.body.notlp,
        req.body.pekerjaan
    ], function(err, result){
        if (err) console.log(err);
        console.log(result);
    }),
    res.status(201).json({
        message: "Member was added"
    });

});

router.get('/:orderId', (req,res,next)=>{
    res.status(201).json({
        message: "Order details",
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req,res,next)=>{
    res.status(201).json({
        message: "Order deleted",
        orderId: req.params.orderId
    });
});

module.exports = router;

