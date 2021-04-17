const express  = require('express'),
      router   = express.Router(),
      User     = require('../models/user.model'),
      Playlist = require('../models/playlist.model');

router.get('/', async (req, res) => {
    const user = req.user;
    try {
        const playlists = (await User.findById(user._id).populate('playlists').populate('videos')).playlists;
        res.json({ playlists, message: "Success" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Unable to fetch playlists right now' });
    }
});

router.post('/', async (req, res) => {
    const user = req.user;
    const playlist = req.body;
    try {
        const savedPlaylist = await Playlist.create(playlist);
        const updatedUser = await User.findByIdAndUpdate(user._id, { 
            $set: {
                playlists: [...user.playlists, savedPlaylist]
            }
        })
        res.status(201).json({ playlist: savedPlaylist, message: "Success" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Unable to save playlist' });
    }
}); 

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const playlist = await Playlist.findById(id).populate('videos');
        res.json({ playlist, message: "Success" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Unable to fetch playlist' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateObj = req.body;
    try {
        const playlist = await Playlist.findByIdAndUpdate(id, {
            $set: updateObj
        }, { new: true })
        res.json({ playlist, message: "Success" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Unable to save playlist' });
    }
});

module.exports = router;