const mongoose = require('mongoose'),
      { Schema, model } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true},
    email: { type: String},
    password: { type: String, required: true},
    playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist'}],
    uploads: [{ type: Schema.Types.ObjectId, ref: 'Video'}]
});

const User = model('user', userSchema);

module.exports = User;