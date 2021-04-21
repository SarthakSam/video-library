const mongoose          = require('mongoose'),
      {Schema , model } = mongoose;

require('../models/comment.model');

const videoSchema = new Schema({
    title: { type: String, required: "Video cannot be uploaded without a title" },
    thumbnailURL: { type: String, required: "Thumbnail Image is mandatory" },
    description: String,
    videoURL: { type: String, required: "Video link is mandatory" },
    author: { type: Schema.Types.ObjectId, ref: 'user' , required: true },
    views: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' , required: true }],
    dislikedBy: [{ type: Schema.Types.ObjectId, ref: 'User' , required: true }],
    // uploadedDate: { type: Date, default: Date.now },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment', required: true }],
    duration: { type: String, required: "Duration of video is mandatory" },
    source: { type: String, required: "Source is mandatory" }
}, { timestamps: { createdAt: 'uploadedDate'} });

const Video = model('Video', videoSchema);

module.exports = Video;