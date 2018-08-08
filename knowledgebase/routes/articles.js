
var express = require('express');
var router = express.Router();

var Article = require("../models/article");

/* GET articles listing. */
router.get('/', function(req, res, next) {
    Article.getArticles(function(err, articles){
      if(err) {
        console.log(err);
      }
      res.json(articles);
    });
});

/* GET article by id. */
router.get('/:id', function(req, res, next) {
  Article.getArticleById(req.params.id, function(err, article){
    if(err) {
      console.log(err);
    }
    res.json(article);
  });
});

/* GET article by id. */
router.get('/category/:category', function(req, res, next) {
  Article.getArticlesByCategory(req.params.category, function(err, article){
    if(err) {
      console.log(err);
    }
    res.json(article);
  });
});

// POST: add article
router.post("/", function(req, res, next) {
  // create new Article Object
  var newArticle = new Article({
    title: req.body.title,
    category: req.body.category,
    content: req.body.content
  });

  // Add the new Article
  Article.addArticle(newArticle, function(err, article) {
    if(err) {
      console.log("ERROR >>> " + err);
    }

    // redirect: return all articles
    res.location("/articles");
    res.redirect("/articles");
  });

});

// PUT: Updete an article
router.put("/", function(req, res) {

  var id = req.body.id;
  // create new Article Object
  var data = new Article({
    title: req.body.title,
    category: req.body.category,
    content: req.body.content
  });

  // Update the new Article
  Article.updateArticle(id, data, function(err, article) {
    if(err) {
      console.log("ERROR >>> " + err);
    }

    // redirect: return all articles
    res.location("/articles");
    res.redirect('/articles');
  });
});

router.delete("/:id", function(req, res, next) {
  var id = req.params.id;
  Article.removeArticle(id, function(err, article) {
    if(err) {
      console.log(err);
    }

    res.location("/articles");
    res.redirect("/articles");
  });
});

module.exports = router;
