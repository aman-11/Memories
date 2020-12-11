const express = require('express');

//const getPosts = require('../controllers/posts.js');
//const createPost= require('../controllers/posts.js');
/*var type = {
    list: require('../controllers/posts.js').list
  }*/
var type = require('../controllers/posts.js');

const router = express.Router();
//localhost:5000/posts

router.get('/', type.getPosts);
router.post('/', type.createPost);
router.patch('/:id', type.updatePost);
router.delete('/:id', type.deletePost);
router.patch('/:id/likePost',type.likePost);
module.exports = router;