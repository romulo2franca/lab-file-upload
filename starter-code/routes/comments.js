const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');

/* Create Comment */
router.get('/new', (req, res, next) => {
  res.render('comment/new')
})

router.post('/new', (req, res, next) => {
  const { content } = req.body;
  const { picPath, picName } = req.file;

  const newComment = new Comment({
    content,
    picPath: `/uploads/${picPath}`,
    picName
  })

  newComment.save(err => {
    if(err) {
      res.redirect('/comment/new', { message: 'Could not save comment' });
    } else {
      res.redirect('/posts')
    }
  })
})

/* Edit a Specific Comment */
router.get('/:id', (req, res, next) => {
  Comment.findOne({_id: req.params.id})
    .then(comment => {
      res.render('comment/edit', { comment });
    }) 
})

router.post('/:commentId', (req, res, next) => {
  Comment.findOneAndUpdate({_id: req.params.commentId, content})
})

/* Delete a Specific Comment */
router.delete('/:commentId', (req, res, next) => {
  Comment.deleteOne({_id: req.params.commentId})
    .then(()=> {
      res.redirect('/post/' + req.params.id)
    })
})
