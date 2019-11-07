var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var db = require('../models');
var config = require('../config/config.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ol', { title: 'Demo1' });
});

router.get('/heatmap', function(req, res, next){
  res.render('ol/heatmap', {title: 'Demo1'});
});

router.get('/records/:status', function(req,res,next){
  let connection = config["development"],
  sequelize = new Sequelize(connection["database"], connection["username"], connection["password"], {
    host: connection["host"],
    dialect: connection["dialect"]
  }),
  sql = 'SELECT ASTEXT(point) as Point FROM Points';
  if(req.params['status'] !== '0'){
    sql = sql + ' WHERE status = ' + req.params['status'];
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(rows =>{
    res.send(
      rows.map(obj =>{
        return {
          type: "Feature",
          geometry : {
            type:"Point",
            coordinates:JSON.parse(obj['Point'].replace(/\s/,",").replace(/POINT\(/,"[").replace(/\)/,"]"))
          },
        };
      })
    );
  });
});

module.exports = router;
