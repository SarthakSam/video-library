import { FaEllipsisV } from 'react-icons/fa';

import styles from './video.module.css'
import { Menu } from '../../common-components/menu/menu';
import { useStore } from '../../store-context';
import { AddToHistory, AddToPlayList, ChangeRoute } from '../../actions';
import { watchLaterObj } from '../../static-data';
import { useNotifications } from '../../notifications-context';

export function Video( { video, setSelectedVideo } ) {
    const { dispatch, state: { playlists } } = useStore();
    const { showNotification } = useNotifications();

    const saveToWatchLater = () => {
        const videosInWatchLater = playlists.find( playlist => playlist.id === watchLaterObj.id );
        if(videosInWatchLater.items.find( item => item.id === video.id )) {
            showNotification({type: 'ERROR', message: 'Video already present in watch later'});
            return;
        }
        dispatch( new AddToPlayList({ playlistId: watchLaterObj.id, video }) );
    }

    const openPlaylistPopup = () => {
        setSelectedVideo(video);
    }

    const openVideo = (video) => {
        dispatch( new ChangeRoute({ path: 'watch', params: video.id }));
        dispatch( new AddToHistory( video ) );
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
            <div class={ styles.card__body }>
                <div className="avatar avatar--round">
                    <img src="https://yt3.ggpht.com/ytc/AAUvwnjuTxkQkUtBdXuoiwzMwXI_iLo0ATcXYeTmkB8XAA=s68-c-k-c0x00ffffff-no-rj" alt="" className="avatar__img"/>
                </div>
                <div className={ styles.card__info }>
                    <p className={ styles.card__title } >{ video.title }</p>
                    <p className="card__meta">{ video.author }</p>
                    <span className="card__meta">{ video.views }</span>
                    <span className="card__meta">{ video.uploadedDate }</span>
                </div>
                <Menu className="col-1 m-0 p-0" icon = { <FaEllipsisV/> } options = { options } />
            </div>

           
        </li>
    )
}