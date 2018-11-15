/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentsSchema = Schema({
  content: String,
  authorId: ObjectId,
  imagePath: String,
  imageName: String
});

const Comments = mongoose.model('Comment', CommentsSchema);

module.exports = Comments;
