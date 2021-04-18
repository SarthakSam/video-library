import { FaEllipsisV } from 'react-icons/fa';

import styles from './PlaylistItem.module.css';
import { useNavigate } from 'react-router';

export function PlaylistItem({ video }) {
    const navigate = useNavigate();

    const openVideo = (video) => {
        navigate(`/watch/${video._id}`)
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
                    <p className={ styles.card__title }>{ video.title.length > 20 ? `${video.title.substring(0, 20)}...` : video.title.substring(0, 20)  }</p>
                    <p className="card__meta">{ video.author?.username }</p>
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