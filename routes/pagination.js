var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var db = require('../models/');
var group = db.Group;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pagination', { title: 'Demo3' });
});

router.get('/pagination',function(req,res,next){
  const munis = ["港","新宿","品川","目黒","大田","世田谷","渋谷","中野","杉並","練馬","台東","墨田","江東","荒川","足立","葛飾","江戸川","千代田","中央","文京","豊島","北","板橋"];
  res.render('pagination/pagination', {title: 'Demo3', munis: munis});
});

router.post('/search', function(req,res,next){
  let whereStatement = [];
  const orderStatement = [['id', 'DESC']];
  if(req.body["free_word"]){
    whereStatement.push({
      $or: [
        {name: {$like: "%" + req.body["free_word"] + "%"}},
        {deputy_name: {$like: "%" + req.body["free_word"] + "%"}},
        {contact: {$like: "%" + req.body["free_word"] + "%"}},
        {outline: {$like: "%" + req.body["free_word"] + "%"}}
      ]
    });
  }
  if(req.body["municipality"]){
    whereStatement.push({
      municipality: req.body["municipality"]
    });
  }
  const job = async () => {
    const per_page = 6, offset = (req.body["page"] - 1) * per_page;
    let drawDatas = {page: req.body["page"]};
    console.log("offset:" + offset);
    await group.max('updatedAt').then(max => {
      drawDatas.lastUpdated = max;
    });

    await group.count().then(c => {
      drawDatas.fullCount = c;
    });

    await group.findAndCountAll({
      where: whereStatement,
      order: orderStatement,
      offset: offset,
      limit: per_page,
    }).then(result => {
      drawDatas.hitCount = result.count;
      drawDatas.endPage = Math.ceil(result.count / per_page);
      drawDatas.records = result.rows;
    });
    res.json(drawDatas);
  }
  job();
});

module.exports = router;
