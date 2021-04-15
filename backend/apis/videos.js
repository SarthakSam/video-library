const express    = require('express'),
      router     = express.Router(),
      Video      = require('../models/video.model');

router.get('/', async (req, res) => {
    try {
        const videos = await Video.find({});
        res.json({ videos, message: "Success" });   
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong'});
    }
});

router.post('/', async (req, res) => {
    const video = req.body;
    try {
        const savedVideo = await Video.create(video);
        res.status(201).json({ message: "Success", video: savedVideo });
    } catch(err) {
        console.log(err);
        res.status(500).json( { error: 'Unable to save video'} );
    }
}); 

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const video = await Video.findById(id);
        res.json( { message: 'Success', video } );
    } catch( err ) {
        console.log(err);
        res.status(404).json( { error: 'No video found with this id'} )
    }
});

module.exports = router;