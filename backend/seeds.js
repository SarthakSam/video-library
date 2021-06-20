const Video  = require('./models/video.model'),
      videos = require('./mock-data/videos');

function seedVideos() {
    videos.forEach( async (video) => {
        try {
            const savedVideo = await Video.create(video);
            console.log(savedVideo);
        } catch(err) {
            console.log(err);
        }
    })
    
}

module.exports = seedVideos;