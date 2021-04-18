const mongoose          = require('mongoose'),
      {Schema , model } = mongoose;

const videoSchema = new Schema({
    title: { type: String, required: true },
    thumbnailURL: { type: String, required: true },
    description: String,
    videoURL: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user' , required: true },
    views: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' , required: true }],
    dislikedBy: [{ type: Schema.Types.ObjectId, ref: 'User' , required: true }],
    // uploadedDate: { type: Date, default: Date.now },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: true }],
    duration: { type: String, required: true },
    source: { type: String, required: true }
}, { timestamps: { createdAt: 'uploadedDate'} });

const Video = model('Video', videoSchema);

module.exports = Video;