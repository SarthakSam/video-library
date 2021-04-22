
import { UseAxios } from '../custom-hooks/useAxios';
import styles from './new-video.module.css';
import { useNotifications } from '../contexts/notifications-context';
import { useAuth } from '../contexts/auth-context';
import { useNavigate } from 'react-router';
import { mapping } from '../api.config';
import { useState } from 'react';

export function NewVideo() {
    const [video, setVideo] = useState({ title: '', description: '', duration: '', thumbnailURL: '', videoURL: '', source: 'YOUTUBE'  });
    const { showNotification } = useNotifications();
    const navigate = useNavigate();
    const apiCall = UseAxios();
    const { user } = useAuth();


    const onChange = (field, value) => {
        setVideo({ ...video, [field]: value });
    }

    const getThumbnailImageURLForYoutube = (videoURL) => {
        const videoId = videoURL.split("/").pop();
        return `http://img.youtube.com/vi/${videoId}/0.jpg`;
    }

    const submitForm = async (event) => {
        event.preventDefault();
        const body = { ...video, thumbnailURL: video.source === 'YOUTUBE'? getThumbnailImageURLForYoutube(video.videoURL) : video.thumbnailURL };
        const config = {
            headers: {
                authtoken: user._id
            }
        }

        apiCall('post', (resp) => {
            showNotification({ type: 'SUCCESS', message: 'Video uploaded successfully'});
                navigate(`/`)
        }, (err) => {
            showNotification({ type: 'ERROR', message: err});
        } , mapping['postVideo'] , body, config);
    }

    return (
        <form className={ styles.newVideo__form } onSubmit = { submitForm }>
            <h2 className="h2">Upload a new Video</h2>
            <br/>
            
            <label className="form__label" htmlFor="title">Enter video title</label>
            <div className="input input--fluid">
                <input type="text" placeholder="Enter title" name='title' value = { video.title } onChange = { (e) => { onChange('title', e.target.value) } } />
            </div>
            <br/>

            <label className="form__label" htmlFor="title">Enter video description</label>
            <textarea className="textarea textarea--fluid" placeholder="Enter description" name='description' value = { video.description } onChange = { (e) => { onChange('description', e.target.value) } }>
            </textarea>
            <br/>

            <label className="form__label" htmlFor="title">Enter video url</label>
            <div className="input input--fluid">
                <input type="text" placeholder="Enter url" name='videoURL' value = { video.videoURL } onChange = { (e) => { onChange('videoURL', e.target.value) } }/>
            </div>
            <span className="h6"><strong>NOTE :</strong> Paste the url that comes up when we click on share button of video</span>

            <br/>

            {
                video.source !== 'YOUTUBE' && 
                <>
                    <label className="form__label" htmlFor="title">Enter placeholder image link</label>
                    <div className="input input--fluid">
                        <input type="text" placeholder="Enter image url" name='thumbnailURL' value = { video.thumbnailURL } onChange = { (e) => { onChange('thumbnailURL', e.target.value) } } />
                    </div>
                    <br/>
                </>
            }

            <label className="form__label" htmlFor="title">Enter video duration</label>
            <div className="input input--fluid">
                <input type="time" name='duration' step="2" value = { video.duration } onChange = { (e) => { onChange('duration', e.target.value) } }/>
            </div>
            <br/>
            
            <button className="btn btn--primary">Upload</button>

        </form>
    )
}