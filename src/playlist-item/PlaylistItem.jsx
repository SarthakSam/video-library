import { FaEllipsisV } from 'react-icons/fa';

import { useStore } from '../store-context';
import { AddToHistory } from '../actions';
import styles from './PlaylistItem.module.css';
import { useNavigate } from 'react-router';

export function PlaylistItem({ video }) {
    const { dispatch } = useStore();
    const navigate = useNavigate();


    const openVideo = (video) => {
        dispatch( new AddToHistory( video ) );
        navigate(`/watch/${video.id}`)
    }

    return (
        <div className={ styles.playlistItem } onClick = { () => openVideo(video) }>
                <div className={styles.thumbnail__img + " badge__container"} >
                    <img src={video.thumbnailURL} alt="" />
                    <span className={"badge " + styles.duration}>
                        23:47
                    </span>
                </div>
                <div className={ styles.card__content }>
                    <p className={ styles.card__title }>{video.title}</p>
                    <p className="card__meta">{ video.author }</p>
                    <ul className={styles.watch__list}>
                        <li className={ "card__meta " + styles.watch__list__item }>{ video.views } views</li>
                        <li className={ "card__meta " + styles.watch__list__item }>{ video.uploadedDate }</li>
                    </ul>
                </div>
                <span className={ styles.option }>
                    <FaEllipsisV />
                </span>
        </div>
    )
}