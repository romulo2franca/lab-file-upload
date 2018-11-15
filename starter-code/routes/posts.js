const express = require('express');
const router = express.Router();
const Post = require('../models/post')

const multer = require('multer');
const upload = multer({ dest: './public/uploads' });

router.get('/new', (req, res, next) => {
  res.render('posts/new');
})

router.post('/new', upload.single('picture'), (req, res, next) => {
  const { content } = req.body;
  const filename = req.file.filename;
  console.log(filename);

  const newPost = new Post({
    content,
    picPath: `/uploads/${filename}`,
    picName: filename
  })
  console.log(newPost.imagePath)

  newPost.save(err => {
    if(err) {
      console.log(err)
    } else {
      res.redirect('/')
    }
  })
})

/* Specific Post */
router.get('/:postId', (req, res, next) => {
  Post.findOne({ _id: req.params.postId })
    .then(post => {
      res.render('posts/post' , { post })
    })
    .catch(err => {
      console.log(err);
    })
})

/* Edit Specific Post */
router.get('/:postId/edit', (req, res, next) => {
  Post.findOne({ _id: req.params.postId })
    .then(post => {
      res.render('posts/edit', { post })
    })
    .catch(err => {
      console.log(err);
    })
});

router.post('/:postId/edit', upload.single('picture'), (req, res, next) => {
  const { content } = req.body;
  const filename = req.file.filename;
  Post.findOneAndUpdate({ _id: req.params.id }, { content: content, picPath: filename })
    .populate('comments')
    .then(post => {
      res.redirect('/' + post.id, { post })
    })
    .catch(err => {
      console.log(err);
    })
})

/* Delete Specific Post */
router.get('/:postId/delete', (req, res, next) => {
  Post.findOneAndRemove( { _id: req.params.postId } )
    .then(() => {
      res.redirect('/')
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;