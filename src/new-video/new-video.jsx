
import { UseAxios } from '../custom-hooks/useAxios';
import styles from './new-video.module.css';
import { useVideo } from '../contexts/video-context';
import { ChangeRoute, EditField, UploadVideo } from '../actions';
import { useStore } from '../contexts/store-context';
import { useNotifications } from '../contexts/notifications-context';
import { useLoader } from '../contexts/loader-context';
import { useNavigate } from 'react-router';

export function NewVideo() {
    const { state: { title, description, duration, thumbnailURL, videoURL, type  }, dispatch } = useVideo();
    const { dispatch: dispatchToStore } = useStore();
    const { setLoading } = useLoader();
    const { showNotification } = useNotifications();
    const navigate = useNavigate();
    const apiCall = UseAxios();


    const onChange = (field, value) => {
        dispatch(new EditField({ field, value}))
    }

    const getThumbnailImageURLForYoutube = (videoURL) => {
        const videoId = videoURL.split("/").pop();
        return `http://img.youtube.com/vi/${videoId}/0.jpg`;
    }

    const submitForm = async (event) => {
        event.preventDefault();
        const body = {
            title, 
            description, 
            duration, 
            thumbnailURL: type === 'YOUTUBE'? getThumbnailImageURLForYoutube(videoURL) : thumbnailURL, 
            videoURL, 
            type, 
            author: 'author1',
            views: 0,
            likes: 0,
            dislike: 0,
            uploadedDate: (new Date()).toLocaleDateString(),
            comments: [],
        }

        apiCall('postVideo', 'post', body, (resp) => {
            showNotification({ type: 'SUCCESS', message: 'Video uploaded successfully'});
                // console.log(resp.data.video);
                dispatchToStore( new UploadVideo( resp.data.video) );
                dispatchToStore( new ChangeRoute( { path: 'uploads', params: '' } ) );
                navigate(`/`)
        }, (err) => {
            showNotification({ type: 'ERROR', message: err.message});
        });
    }

    return (
        <form className={ styles.newVideo__form } onSubmit = { submitForm }>
            <h2 className="h2">Upload a new Video</h2>
            <br/>
            
            <label className="form__label" htmlFor="title">Enter video title</label>
            <div className="input input--fluid">
                <input type="text" placeholder="Enter title" name='title' value = { title } onChange = { (e) => { onChange('title', e.target.value) } } />
            </div>
            <br/>

            <label className="form__label" htmlFor="title">Enter video description</label>
            <textarea className="textarea textarea--fluid" placeholder="Enter description" name='description' value = { description } onChange = { (e) => { onChange('description', e.target.value) } }>
            </textarea>
            <br/>

            <label className="form__label" htmlFor="title">Enter video url</label>
            <div className="input input--fluid">
                <input type="text" placeholder="Enter url" name='videoURL' value = { videoURL } onChange = { (e) => { onChange('videoURL', e.target.value) } }/>
            </div>
            <br/>

            {
                type !== 'YOUTUBE' && 
                <>
                    <label className="form__label" htmlFor="title">Enter placeholder image link</label>
                    <div className="input input--fluid">
                        <input type="text" placeholder="Enter image url" name='thumbnailURL' value = { thumbnailURL } onChange = { (e) => { onChange('thumbnailURL', e.target.value) } } />
                    </div>
                    <br/>
                </>
            }

            <label className="form__label" htmlFor="title">Enter video duration</label>
            <div className="input input--fluid">
                <input type="time" name='duration' value = { duration } onChange = { (e) => { onChange('duration', e.target.value) } }/>
            </div>
            <br/>
            
            <button className="btn btn--primary">Upload</button>

        </form>
    )
}