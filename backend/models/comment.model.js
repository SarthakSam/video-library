const mongoose          = require('mongoose'),
      Populate          = require('../utils/populate'),
      { Schema, model } = mongoose;

const commentSchema = new Schema({
    content: { type: String, required: 'Cannot post empty comment'},
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    comments: [{type: Schema.Types.ObjectId, ref: "comment"}]
})

commentSchema
    .pre('findOne', Populate('author', 'username'))
    .pre('find', Populate('author', 'username'))
    .pre('findOne', Populate('comments'))
    .pre('find', Populate('comments'));

const Comment = model('comment', commentSchema);

module.exports = Comment;
