import './new-video.css';

export function NewVideo() {
    return (
        <div className="new-video-container">
            <form className="new-video-form">
            <h2 className="h2">Upload a new Video</h2>
            <br/>
            
            <label className="form-label" htmlFor="title">Enter video title</label>
            <div className="input input--fluid">
                <input type="text" placeholder="Enter title" name='title' />
            </div>
            <br/>

            <label className="form-label" htmlFor="title">Enter video description</label>
            <div className="input input--fluid">
                <input type="text" placeholder="Enter description" name='description' />
            </div>
            <br/>

            <label className="form-label" htmlFor="title">Enter video url</label>
            <div className="input input--fluid">
                <input type="text" placeholder="Enter url" name='video-url' />
            </div>
            <br/>

            <label className="form-label" htmlFor="title">Enter placeholder image link</label>
            <div className="input input--fluid">
                <input type="text" placeholder="Enter image url" name='image-url' />
            </div>
            <br/>

            <label className="form-label" htmlFor="title">Enter video duration</label>
            <div className="input input--fluid">
                <input type="time" name='duration' />
            </div>
            <br/>
            
            <button className="btn btn--primary">Upload</button>

        </form>
        </div>
    )
}