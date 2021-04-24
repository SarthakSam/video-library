import { FaTimes } from 'react-icons/fa';
import { useStore } from '../contexts/store-context';
import styles from './playlist-popup.module.css';
import { AddToPlayList, CreatePlayList, RemoveFromPlayList } from '../actions';
import { NewPlaylist } from './new-playlist/new-playlist';
import { UseAxios } from '../custom-hooks/useAxios';
import { getUrl } from '../api.config';
import { useNotifications } from "../contexts/notifications-context";
import { useAuth } from '../contexts/auth-context';

export function PlayListPopup({ selectedVideo: video, setSelectedVideo }) {

    let { state: { playlists }, dispatch } = useStore();
    const apiCall = UseAxios();
    const { showNotification } = useNotifications();
    const { user } = useAuth();

    // let playlists = allPlaylists.slice(4);

    playlists = playlists.map( playlist => {
        return { ...playlist, containsCurrentVideo: playlist.videos.some( item => item._id === video._id ) };
    })    

    const closePopup = () => {
        setSelectedVideo(null);
    }

    const addToPlayList = (playlist, checked) => {
        let videos = playlist.videos;
        let action;
        if(checked) {
            videos = [...videos, video];
            action = new AddToPlayList({playlistId: playlist._id, video});
        }
        else {
            videos = videos.filter( item => item._id !== video._id );
            action = new RemoveFromPlayList({playlistId: playlist._id, video});
        }

        const onSuccess = (res) => {
            showNotification({ type: 'SUCCESS', message: 'Video added to playlist'});
            dispatch( action );
        }

         const onFailure = (err) => {
            console.log(err);
            showNotification({ type: 'ERROR', message: 'Something went wrong... Please try again after sometime'});
        }
        updateVideosInPlaylist(playlist._id, videos, onSuccess, onFailure);
    }

    const createNewPlaylist = (playlist) => {
        const onSuccess = (res) => {
            showNotification({ type: 'SUCCESS', message: 'Playlist created successfully'});
            dispatch( new CreatePlayList({ playlist, video }));
            closePopup();
        }

        const onFailure = (err) => {
            console.log(err);
            showNotification({ type: 'ERROR', message: err});
        }

        updateVideosInPlaylist(playlist._id, [video._id], onSuccess, onFailure);
    }

    const updateVideosInPlaylist = (id, videos, successCallback, failureCallback) => {
        const body = { videos };
        const config = { headers: { authToken: user._id } }
        apiCall('put', successCallback, failureCallback, `${getUrl('updatePlaylist')}/${id}`, body, config);
    }

    return (
        <div className={ styles.popup__container + " popup__container popup--small" }>
            <div className="popup">
                <div className="popup__header">
                    <p className="popup__title">Save to...</p>   
                    <FaTimes onClick = { closePopup } style = {{ cursor: 'pointer'}} tabIndex = "1"/>
                </div>
                <div className="popup__body">
                    <ul className={ styles.playlist }>
                        {
                            playlists.map( item => 
                            <li key = { item._id} className={ styles.playlist__item }>
                                <input type="checkbox" id={item._id} onChange = { (e) => addToPlayList(item, e.target.checked) } defaultChecked = { item.containsCurrentVideo } />
                                <label className={styles.playlist__label} htmlFor={item._id}>{item.title}</label>
                            </li> )
                        }
                    </ul>
                </div>
                <div className={styles.popup__footer + " popup__footer"}>
                    <NewPlaylist createNewPlaylist = { createNewPlaylist } />    
                </div>
            </div>
        </div>
    )
}