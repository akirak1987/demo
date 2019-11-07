var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var db = require('../models/');
var trail = db.Trail;
var moment = require('moment');

const HOST = 'http://127.0.0.1:8000';
//var socket = require('socket.io-client')(HOST);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('websocket', { title: 'Demo2' });
});

router.get('/websocket',function(req,res,next){
  trail.findAll({
    where: {
      size: null,
      settime: {
        $gte: moment().format("YYYY-MM-DD 00:00:00"),
        $lt: moment().format("YYYY-MM-DD 23:59:59")
      }
    }
  }).then(records => {
    console.log(JSON.stringify(records));
    res.render('websocket/websocket', {title: 'Demo2',records: JSON.stringify(records)});
  });
});

router.post('/insert', function(req,res,next){
  let socket = require('socket.io-client')(HOST);
  trail.create({
    settime: req.body["set_time"],
    epc: req.body["epc"],
    tag: req.body["tag"],
    reader: req.body["reader"]
  }).then(async (trail) => {
    console.log("new ID: ", trail.id);
    await socket.emit("create", {
      id: trail.id,
      set_time: new Date(req.body["set_time"]).toLocaleString('ja-JP', {hour12: false}),
      epc: req.body["epc"],
      tag: req.body["tag"],
      reader: req.body["reader"]
    });
    res.send("set OK\n");
  });
});

module.exports = router;
