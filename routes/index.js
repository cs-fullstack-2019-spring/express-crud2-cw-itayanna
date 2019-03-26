var express = require('express');
var router = express.Router();
var PostCollection = require('../models/PostSchema');



/* GET home page. */
router.get('/', function(req, res, next) {

  PostCollection.find({}, (errors, results)=>
  {
    if (errors) res.send(errors);
    else {
      context = {
        title: "Post Collection",
        allPost: results,
      };
      res.render('index', context);
    }
  });
});


router.get('/create', (req, res) => res.render('createAlbum'));

router.get('/saveAlbum', (req, res)=>{
  PostCollection.create(
      {userId: req.query.userId,
        id: req.query.id,
        title: req.query.title,
        body: req.query.body}, (errors)=>{
        if (errors) res.send(errors);
        else res.redirect("/");
      })
});

router.get('/update/:id/:title/:body', (req,res)=>{
  PostCollection.updateOne(
      {id: req.params.id},
      {
        title: req.params.title,
          body: req.params.body}, (errors, results)=>{
        if (errors) res.send(errors);
        else res.send(results);
      })
} );




module.exports = router;
