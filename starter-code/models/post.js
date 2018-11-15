/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = Schema({
  content: String,
  creatorId: [{type: ObjectId, ref:'User'}],
  picPath: String,
  picName: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
