const express    = require('express'),
      router     = express.Router(),
      videos     = require('../mock-data/videos');

router.get('/', (req, res) => {
    res.json({ videos, message: "Success" });
});

router.post('/', (req, res) => {
    const video = req.body;
    videos.push(video);
    res.json(201).json({ message: "Success" });
}); 

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const video = videos.find(video => video.id === id);
    video? res.json( { message: 'Success', video } ) : res.status(404).json( { message: 'No video found with this id'} )
});

module.exports = router;