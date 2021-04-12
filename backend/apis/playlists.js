const express    = require('express'),
      router     = express.Router(),
      playlists  = require('../mock-data/playlists');


router.get('/', (req, res) => {
    res.json({ playlists, message: "Success" });
});

router.post('/', (req, res) => {
    const playlist = req.body;
    playlists.push(playlist);
    res.json(201).json({ message: "Success" });
}); 

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const playlist = playlists.find(playlist => playlist.id === id);
    playlist? res.json( { message: 'Success', playlist } ) : res.status(404).json( { message: 'No playlist found with this id'} )
});

module.exports = router;