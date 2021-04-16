const express  = require('express'),
      router   = express.Router(),
      Playlist = require('../models/playlist.model');

router.get('/', async (req, res) => {
    try {
        const playlists = await Playlist.find({}).populate('videos');
        res.json({ playlists, message: "Success" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Unable to fetch playlists right now' });
    }
});

router.post('/', async (req, res) => {
    const playlist = req.body;
    try {
        const savedPlaylist = await Playlist.create(playlist);
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