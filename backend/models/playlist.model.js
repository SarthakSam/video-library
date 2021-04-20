const mongoose =          require('mongoose'),
      { Schema, model } = mongoose;

const playlistSchema = new Schema({
    title: { type: String, required: "PLaylist title is mandatory"},
    description: String,
    thumbnailURL: String,
    visibility: { type: String, default: 'PRIVATE'},
    icon: String,
    // goTo: String,
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video'}],
    isPermanent: Boolean
});

const Playlist = model('Playlist', playlistSchema);

module.exports = Playlist;
