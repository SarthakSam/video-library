const express = require('express'),
      router  = express.Router(),
      User    = require('../models/user.model');

router.post('/signin', async (req, res) => {
    const user = req.body;
    try {
        const foundUser = await User.findOne({ username: user.username });
        if(foundUser) {
            if(foundUser.password === req.body.password) {
                res.json({ message: `Hello ${foundUser.username}`, user: foundUser })
            } else {
                res.status(500).json({ error: 'Incorrect password' });
            }
           res.status(500).json({ error: 'User with this username already exists' });
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
            res.status(201).json({ message: `Hello ${newUser.username}`, user: newUser });
         }
    } catch(err) {
        console.log(err);
        res.status(err.statusCode).json({error: err});
    } 
});

module.exports = router;