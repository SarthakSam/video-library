const express  = require('express'),
      router   = express.Router(),
      User     = require('../models/user.model'),
      Playlist = require('../models/playlist.model');

router.get('/', async (req, res) => {
    const user = req.user;
    try {
        // const playlists = (await user.populate({
        //     path: 'playlists',
        //     populate: { 
        //         path: 'videos'
        //     }
        // })).playlists
        const { playlists } = await user.populate({ path: 'playlists', populate: { path: 'videos' } }).execPopulate();
        // console.log(playlists);

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
        user.playlists = [...user.playlists, savedPlaylist];
        await user.save();
        // const updatedUser = await User.findByIdAndUpdate(user._id, { 
        //     $set: {
        //         playlists: [...user.playlists, savedPlaylist]
        //     }
        // })
        res.status(201).json({ playlist: savedPlaylist, message: "Success" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Unable to save playlist' });
    }
}); 

router.get('/:id', async (req, res) => {
    const playlist = req.playlist;
    res.json({ playlist, message: "Success" });
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

router.post('/:id/removeFromPlaylists/:videoId', async (req, res) => {
    const playlist = req.playlist;
    const { videoId } = req.params;
    try {
        playlist.videos = playlist.videos.filter(video => !video._id.equals(videoId));
        await playlist.save();
        res.status(201).json({message: 'success', videoId});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}) 

router.param("id", async (req, res, next, id) => {
    try {
        const playlist = await Playlist.findById(id);
        if(!playlist)
            return res.status(500).json({ error: "Error while fetching playlist" });
        req.playlist = playlist;
        next();
    } catch(err) {
        return res.status(404).json({ error: err });
    }
})

module.exports = router;