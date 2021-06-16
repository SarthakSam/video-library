const express           = require('express'),
      app               = express(),
      bodyParser        = require('body-parser'),
      cors              = require('cors'),
      mongoose          = require('mongoose'),
      dotEnv            = require('dotenv'),
      seedVideos        = require('./seeds'),
      videosRouter      = require('./apis/videos.api'),
      playlistsRouter   = require('./apis/playlists.api'),
      userRouter        = require('./apis/user.api'),
      isAuthenticated   = require('./middlewares/isAuthenticated');
      
dotEnv.config();
const PORT = process. env. PORT || 3001;
const localDb = 'mongodb://localhost:27017/stream-it';
const deployDb = `mongodb+srv://${ process.env.DBUSER }:${ process.env.DBPASSWORD }@mycluster.dxrov.mongodb.net/stream-it?retryWrites=true&w=majority`

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(localDb, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("DB connected")
    // seedVideos();
})
.catch(console.log);

app.use('/', userRouter);
app.use('/videos', videosRouter);
app.use('/playlists', isAuthenticated);
app.use('/playlists', playlistsRouter);

app.get('/', (req, res) => {
    res.send("Streamit Server");
});

app.use((req, res) => {
    res.status(404).json({ error: "no such route exists!!" });
})

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).json({ error: err });
})

// app.get('*', (req, res) => {
//     res.status(404).send("no such route exists!!");
// })

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log(`Server started at port ${PORT}`);
    }
})

// heroku local web => to run locally heroku
// git subtree push --prefix path/to/subdirectory heroku master => to push to heroku