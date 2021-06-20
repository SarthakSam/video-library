import { FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

import styles from './video.module.css'
import { Menu } from '../../common-components/menu/menu';
import { useStore } from '../../contexts/store-context';
import { AddToPlayList } from '../../actions';
import { useNotifications } from '../../contexts/notifications-context';
import { useAuth } from '../../contexts/auth-context';
import { UseAxios } from '../../custom-hooks/useAxios';
import { getUrl } from '../../api.config';

export function Video( { video, setSelectedVideo } ) {
    const { dispatch, state: { playlists } } = useStore();
    const { showNotification } = useNotifications();
    const navigate = useNavigate();
    const { user } = useAuth();
    const apiCall = UseAxios();

    const saveToWatchLater = () => {
        if(!user) {
            showNotification({ type: 'ERROR', message: 'Please signin to add video to watch later' });
            return;
        }
        const watchLater = playlists.find( playlist => playlist.title.toUpperCase() === 'WATCH LATER' );
        if(watchLater.videos.find( item => item._id === video._id )) {
            showNotification({type: 'WARNING', message: 'Video already present in watch later'});
            return;
        }
        let videos = [...watchLater.videos, video];
        const body = { videos };
        const config = { headers: { authToken: user._id } }
        const onSuccess = (res) => {
            showNotification({ type: 'SUCCESS', message: 'Video added to watch later'});
            dispatch( new AddToPlayList({ playlistId: watchLater._id, video }) );
        }

         const onFailure = (err) => {
            console.log(err);
            showNotification({ type: 'ERROR', message: 'Something went wrong... Please try again after sometime'});
        }
        apiCall('put', onSuccess, onFailure, getUrl('updatePlaylist', { playlistId: watchLater._id } ), body, config);
    }

    const openPlaylistPopup = () => {
        if(!user) {
            showNotification({ type: 'ERROR', message: 'Want to create your own playlist... Please Signin' });
            return;
        }
        setSelectedVideo(video);
    }

    const openVideo = (video) => {
        navigate(`/watch/${video._id}`)
    }

    const options = [
        {title: 'Save To Watch Later', action: saveToWatchLater},
        {title: 'Save To Playlist', action: openPlaylistPopup },
    ]

    return (
        <li className = { styles.card + " card col-3 col-xl-4 col-lg-4 col-md-6 col-sm-12" } onClick = { () => openVideo(video) }>
            <div className= "card__img badge__container">
                <img className = { styles.img } src={ video.thumbnailURL } alt=""/>
                <span className={ styles.badge + " badge bg-black text-white" }>{ video.duration }</span>
            </div>
            <div className={ styles.card__body }>
                <div className="avatar avatar--round">
                    <img src="https://yt3.ggpht.com/ytc/AAUvwnjuTxkQkUtBdXuoiwzMwXI_iLo0ATcXYeTmkB8XAA=s68-c-k-c0x00ffffff-no-rj" alt="" className="avatar__img"/>
                </div>
                <div className={ styles.card__info }>
                    <p className={ styles.card__title } >{ video.title }</p>
                    <div className="row spaceBetween">
                        <span className="card__meta">{ video.views } views</span> 
                        <span className="card__meta">Uploaded on { video.uploadedDate }</span>
                        <span className="card__meta">{ video.author?.username }</span>
                    </div>
                </div>
                <Menu className="col-1 m-0 p-0" icon = { <FaEllipsisV/> } options = { options } />
            </div>

           
        </li>
    )
}