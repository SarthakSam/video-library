const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      videos     = require('./mock-data/videos');

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
    console.log(video);
    videos.push(video);
    res.json(201).json({ message: "Success" });
}); 

app.get('/videos/:id', (req, res) => {
    const { id } = req.params;
    const video = videos.find(video => video.id === id);
    video? res.json( { message: 'Success', video } ) : res.status(404).json( { message: 'No video found with this id'} )
});

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log(`Server started at port ${PORT}`);
    }
})