const express               = require('express'),
      router                = express.Router(),
      bcrypt                = require('bcrypt'),
      User                  = require('../models/user.model'),
      Playlist              = require('../models/playlist.model'),
      isAuthenticated       = require('../middlewares/isAuthenticated'),
      getAuthorizationToken = require('../utils/getAuthorizationToken');

router.post('/signin', async (req, res) => {
    const user = req.body;
    try {
        const foundUser = await User.findOne({ username: user.username });
        if(foundUser) {
            const validPassword = await bcrypt.compare(user.password, foundUser.password);
            if(validPassword) {
                const { username, email, _id } = foundUser;
                res.json({ message: `Hello ${foundUser.username}`, user: { username, email, _id, authorization: getAuthorizationToken( { _id } ) } });
            } else {
                res.status(500).json({ error: 'Incorrect password' });
            }
        }
        else {
           res.status(500).json({ error: `No such user exists. Please signup`});
        }
   } catch(err) {
       console.log(err);
       res.status(500).send(err);
   }
});

router.post('/signup', async (req, res, next) => {
    const user = req.body;
    if(!user.username || !user.password1 || !user.password2) {
        return res.status(500).json({ error: 'Please fill mandatory fields'});
    }
    if(user.password1 !== user.password2) {
        return res.status(500).json({ error: 'Password doesnot match'});
    }
    try {
         const foundUser = await User.findOne({ username: user.username });
         if(foundUser) {
            res.status(500).json({ error: 'User with this username already exists' });
         }
         else {
            const { password1, password2, ...rest } = user;
            const salt = await bcrypt.genSalt(10);
            rest['password'] = await bcrypt.hash(password1, salt);
            const newUser = await User.create(rest);
            req.user = newUser;
            // const { username, email, _id } = newUser;
            // req.user = { username, email, _id };
            next();
         }
    } catch(err) {
        console.log(err);
        res.status(err.statusCode).json({error: err});
    } 
}, async (req, res, next) => {
    const playlist = {
        title: 'Watch Later',
        icon: 'BsClockFill',
        isPermanent: true
    }
    const watchLaterPlaylist = await Playlist.create(playlist);
    const user = req.user;
    user.playlists.push(watchLaterPlaylist);
    await user.save();
    const { username, email, _id } = user;
    res.status(201).json({ message: `Hello ${user.username}`, user: { username, email, _id, authorization: getAuthorizationToken({ _id }) } });
});

router.get('/uploads', isAuthenticated , async (req, res) => {
    const user = req.user;
    try {
        const videos = (await user.populate('uploads').execPopulate()).uploads;
        // const videos = (await User.findById(user.id).populate('uploads')).uploads;
        res.status(200).send({ message: 'Success', videos });
    } catch(err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;