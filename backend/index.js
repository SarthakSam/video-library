const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      videos     = require('./mock-data/videos'),
      playlists  = require('./mock-data/playlists');

const PORT = 3001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Streamit Server");
});

app.get('/videos', (req, res) => {
    res.json({ videos, message: "Success" });
});

app.post('/videos', (req, res) => {
    const video = req.body;
    videos.push(video);
    res.json(201).json({ message: "Success" });
}); 

app.get('/videos/:id', (req, res) => {
    const { id } = req.params;
    const video = videos.find(video => video.id === id);
    video? res.json( { message: 'Success', video } ) : res.status(404).json( { message: 'No video found with this id'} )
});

app.get('/playlists', (req, res) => {
    res.json({ playlists, message: "Success" });
});

app.post('/playlists', (req, res) => {
    const playlist = req.body;
    playlists.push(playlist);
    res.json(201).json({ message: "Success" });
}); 

app.get('/playlists/:id', (req, res) => {
    const { id } = req.params;
    const playlist = playlists.find(playlist => playlist.id === id);
    playlist? res.json( { message: 'Success', playlist } ) : res.status(404).json( { message: 'No playlist found with this id'} )
});


app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log(`Server started at port ${PORT}`);
    }
})