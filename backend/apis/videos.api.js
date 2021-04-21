const express           = require('express'),
      router            = express.Router(),
      User              = require('../models/user.model'),
      Video             = require('../models/video.model'),
      Comment           = require('../models/comment.model'),
      isAuthenticated   = require('../middlewares/isAuthenticated');

router.get('/', async (req, res) => {
    try {
        const videos = await Video.find({}).populate('author', 'username');
        res.json({ videos, message: "Success" });   
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong'});
    }
});

router.post('/', isAuthenticated, async (req, res) => {
    const video = req.body;
    const user = req.user;
    video.author = user._id
    try {
        const savedVideo = await Video.create(video);
        user.uploads = [...user.uploads, savedVideo];
        await user.save();
        // const updatedUser = await User.findByIdAndUpdate(user._id, {
        //     $set: {
        //         uploads: [...user.uploads, savedVideo]
        //     }
        // })
        res.status(201).json({ message: "Success", video: savedVideo });
    } catch(err) {
        console.log(err);
        res.status(500).json( { error: 'Unable to save video'} );
    }
}); 

router.get('/liked', isAuthenticated , async (req, res) => {
    const user = req.user;
    console.log(user);
    try {
        const videos = await Video.find({ likedBy: user._id });
        res.status(200).send({ message: 'Success', videos });
    } catch(err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});

router.get('/disliked', isAuthenticated , async (req, res) => {
    const user = req.user;
    console.log(user);
    try {
        const videos = await Video.find({ dislikedBy: user._id });
        res.status(200).send({ message: 'Success', videos });
    } catch(err) {
        res.status(500).json({error: err});
    }
});

router.get('/:id', async (req, res) => {
    let video = req.video;
    try {
        video.views++;
        await video.save();
        video = await video.populate('comments').execPopulate();
        res.status(200).json( { message: 'Success', video: video } );
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

router.post('/:id/comments', isAuthenticated, async (req, res) => {
    const content = req.body.comment;
    const author = req.user;
    let video = req.video;
    try {
        const comment = await Comment.create({ content, author });
        video.comments.push(comment);
        video = await video.save();
        res.status(201).json({ message: 'success', comment });
    } catch(err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});

router.post('/:id/comments/:videoId/comments', isAuthenticated, async (req, res) => {
    const content = req.body.comment;
    const author = req.user;
    let video = req.video;
    try {
        const newComment = await Comment.create({ content, author });
        let comment = await Comment.findById(req.params.videoId);
        if(!comment) {
            return res.status(500).json({error: "No such comment exists"});
        }
        comment.comments.push(newComment);
        comment = await comment.save();
        // console.log(comment)
        res.status(201).json({ message: 'success', comment: newComment });
    } catch(err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});


router.post('/:id/likeDislike', isAuthenticated, async (req, res) => {
    const user = req.user;
    const body = req.body;
    const video = req.video;
    try {
        video.likedBy = video.likedBy.filter( userId => !userId.equals(user._id) );
        video.dislikedBy = video.dislikedBy.filter( userId => !userId.equals(user._id));
        if(body['isLiked']) {
            video.likedBy.push(user._id);
        } else if( body['isDisliked']) {
            video.dislikedBy.push(user._id);
        }
        const updatedVideo = await video.save();
        res.status(200).json({ video: updatedVideo, message: 'success' });
    } catch(err) {
        res.status(500).json({ error: err });
    }
});

router.param('id', async (req, res, next, id) => {
    try {
        const video = await Video.findById(id).populate('author', 'username');
        if(!video) {
           return res.status(500).json({ error: 'Error while retrieving the video'});
        }
        req.video = video;
        next();
        // return res.status(200).json( { message: 'Success', video } );
    } catch( err ) {
        console.log(err);
        res.status(404).json( { error: err} );
    }
});

// route.post('/:id/like', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const video = await Video.findByIdAndUpdate(id);
//         res.json( { message: 'Success', video } );
//     } catch( err ) {
//         console.log(err);
//         res.status(404).json( { error: 'No video found with this id'} )
//     }  
// });

module.exports = router;