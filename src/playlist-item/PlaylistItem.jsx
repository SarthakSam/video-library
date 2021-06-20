import { FaEllipsisV } from 'react-icons/fa';

import styles from './PlaylistItem.module.css';
import { useNavigate } from 'react-router';
import { Menu } from '../common-components/menu/menu';
// import { UseAxios } from '../custom-hooks/useAxios';
// import { RemoveFromPlayList } from '../actions';
// import { getUrl } from '../api.config';
// import { useAuth } from '../contexts/auth-context';
// import { useNotifications } from '../contexts/notifications-context';
// import { useStore } from '../contexts/store-context';

export function PlaylistItem({ video, playlistId }) {
    const navigate = useNavigate();
    // const apiCall = UseAxios();
    // const { user } = useAuth();
    // const { showNotification } = useNotifications();
    // const { dispatch } = useStore();

    const openVideo = (video) => {
        navigate(`/watch/${video._id}`)
    }

    // const removeFromPlayList = () => {
    //     const config = {
    //         headers: {
    //             authtoken: user._id
    //         }
    //     }
    //     const url = getUrl('removeVideoFromPlaylist', { id: playlistId, videoId: video._id });
    //     apiCall('post', (res) => {
    //         showNotification({ type: 'SUCCESS', message: 'Video removed from playlist successfully'});
    //         dispatch( new RemoveFromPlayList({ playlistId, videoId: video._id }) );
    //     }, (err) => {
    //         showNotification({ type: 'ERROR', message: err});
    //     }, url, null, config);
    // }

    const options = [
        // {title: 'Remove from playlist', action: removeFromPlayList},
    ]

    return (
        <div className={ styles.playlistItem } onClick = { () => openVideo(video) }>
                <div className={styles.thumbnail__img + " badge__container"} >
                    <img src={video.thumbnailURL} alt="" />
                    <span className={"badge " + styles.duration}>
                        23:47
                    </span>
                </div>
                <div className={ styles.card__content }>
                    <p className={ styles.card__title }>{ video.title.length > 20 ? `${video.title.substring(0, 20)}...` : video.title.substring(0, 20)  }</p>
                    <p className="card__meta">{ video.author?.username }</p>
                    <ul className={styles.watch__list}>
                        <li className={ "card__meta " + styles.watch__list__item }>{ video.views } views</li>
                        <li className={ "card__meta " + styles.watch__list__item }>{ video.uploadedDate }</li>
                    </ul>
                </div>
                <Menu className="col-1 m-0 p-0" icon = { <FaEllipsisV/> } options = { options } />
        </div>
    )
}