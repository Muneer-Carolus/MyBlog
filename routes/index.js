var express = require('express');
var router = express.Router();

var Posts = require('../db.json');
var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Anfield Is Life', posts: Posts.posts});
});
/* GET all the blog posts. Read page */
router.get('/read', function(req, res, next) {
  res.render('read', { title: 'archive',posts: Posts.posts });
});
// /* GET Add Blog posts. */
router.get('/create', function(req, res, next) {
  res.render('create', { title: 'Add Post', posts:Posts.posts});
});
//post new Page
router.post('/create', function(req, res, next) {
// res.send(req.body)
//create variable to posts

  let obj ={
  "title":req.body.title,
  "Author":req.body.author,
  "image":req.body.image,
  "datetime":req.body.datetime,
  "content":req.body.content
  }

  //write logic that saves this data
  request.post({
    url:'http://localhost:8000/posts',
    body:obj,
    json:true
  },function (error,response,body) {
    //what to send when function has finished
    res.redirect('/',);
  });
});

/* GET delete posts via achive page. */
router.get('/delete/:id', function(req, res, next) {
  // console.log(req.params.id)
//make a post request to our database
request({
  url: "http://localhost:8000/posts/"  + req.params.id,
  method: "DELETE",
  }, function(error, response, body) {
    let data = {
      message: 'Successfully Removed.'
  } 
  console.log(data)

      res.redirect('/');
  });
});

// /* GET Edit Blog posts. */
router.get('/edit', function(req, res, next) {
  res.render('edit', { title: 'Edit Post', posts:Posts.posts});
});
// Edit blog posts
router.post('/edit/:id', function(req, res, next) {

  // console.log(req.body)
  let form= {
    "title":req.body.title,
    "Author":req.body.author,
    "image":req.body.image,
    "datetime":req.body.datetime,
    "content":req.body.content,
  }
  //make a post request to our database
  request({
  url: "http://localhost:8000/posts/"+ req.params.id,
  method: "PUT",
  body:form,
  json:true
  }, function(error, response, body) {

      res.render('/');
  });
})
// Target which posts to edit
router.get('/edit/:id', function(req, res, next) {
  let data= req.path;
  let postVal =data.slice(-1);
  res.render('edit', { title: 'Edit Post', posts:Posts.posts[postVal-1]});

});

/* GET contact page. */
router.get('/contactUs', function(req, res, next) {
  res.render('contactus', { title: 'blog posts' });
});

module.exports = router;
