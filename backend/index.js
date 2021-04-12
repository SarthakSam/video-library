const express           = require('express'),
      app               = express(),
      bodyParser        = require('body-parser'),
      videosRouter      = require('./apis/videos'),
      playlistsRouter   = require('./apis/playlists');
      
const PORT = 3001;

app.use(bodyParser.json());

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