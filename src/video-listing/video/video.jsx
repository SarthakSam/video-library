import { FaEllipsisV } from 'react-icons/fa';

import styles from './video.module.css'
import { Menu } from '../../common-components/menu/menu';
import { useStore } from '../../store-context';
import { AddToPlayList, ChangeRoute } from '../../actions';
import { watchLaterObj } from '../../static-data';


export function Video( { video, setSelectedVideo } ) {
    const { dispatch } = useStore();

    const saveToWatchLater = () => {
        dispatch( new AddToPlayList({ playlistId: watchLaterObj.id, video }) );
    }

    const openPlaylistPopup = () => {
        setSelectedVideo(video);
    }

    const openVideo = (id) => {
        dispatch( new ChangeRoute({ path: 'watch', params: id }));
    }

    const options = [
        {title: 'Save To Watch Later', action: saveToWatchLater},
        {title: 'Save To Playlist', action: openPlaylistPopup },
    ]

    return (
        <li className = { styles.card + " card col-3 col-lg-4 col-md-6 col-sm-12" } onClick = { () => openVideo(video.id) }>
            <div className= "card__img badge__container">
                <img className = { styles.img } src={ video.imageUrl } alt=""/>
                <span className={ styles.badge + " badge bg-black text-white" }>{ video.duration }</span>
            </div>
            <p className="card__title">{ video.title }</p>
            <p className="card__meta">{ video.author }</p>
            <span className="card__meta">{ video.views }</span>
            <span className="card__meta">{ video.uploadedDate }</span>
            <Menu icon = { <FaEllipsisV/> } options = { options} />
        </li>
    )
}