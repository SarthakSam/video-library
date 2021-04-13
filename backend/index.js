const express           = require('express'),
      app               = express(),
      bodyParser        = require('body-parser'),
      cors              = require('cors'),
      videosRouter      = require('./apis/videos'),
      playlistsRouter   = require('./apis/playlists');
      
const PORT = process. env. PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// app.use((req, res, next) => { 
//     console.log("request aai thi"); 
//     next(); 
// } );

app.use('/videos', videosRouter);
app.use('/playlists', playlistsRouter);

app.get('/', (req, res) => {
    res.send("Streamit Server");
});

app.get('*', (req, res) => {
    res.status(404).send("no such route exists!!");
})

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