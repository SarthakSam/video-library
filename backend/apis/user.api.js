const express           = require('express'),
      router            = express.Router(),
      User              = require('../models/user.model'),
      isAuthenticated   = require('../middlewares/isAuthenticated');

router.post('/signin', async (req, res) => {
    const user = req.body;
    try {
        const foundUser = await User.findOne({ username: user.username });
        if(foundUser) {
            if(foundUser.password === req.body.password) {
                const { username, email, _id } = foundUser;
                res.json({ message: `Hello ${foundUser.username}`, user: { username, email, _id} })
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

router.post('/signup', async (req, res) => {
    const user = req.body;
    if(!user.username || !user.password1 || !user.password2) {
        return res.status(500).json({ error: 'Please fill mandatory fields'});
    }
    if(user.password1 !== user.password2) {
        return res.status(500).json({ error: 'Password doesnot match'});
    }
    try {
         const foundUser = await User.findOne({ username: user.name });
         if(foundUser) {
            res.status(500).json({ error: 'User with this username already exists' });
         }
         else {
            const { password1, password2, ...rest } = user;
            rest['password'] = password1;
            const newUser = await User.create(rest);
            const { username, email, _id } = foundUser;
            res.status(201).json({ message: `Hello ${newUser.username}`, user: { username, email, _id} });
         }
    } catch(err) {
        console.log(err);
        res.status(err.statusCode).json({error: err});
    } 
});

router.get('/uploads', isAuthenticated , async (req, res) => {
    const user = req.user;
    try {
        const videos = (await User.findById(user.id).populate('uploads')).uploads;
        console.log(videos);
        res.status(200).send({ message: 'Success', videos });
    } catch(err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;