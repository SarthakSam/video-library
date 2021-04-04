import { FaEllipsisV } from 'react-icons/fa';

import { useStore } from '../store-context';
import { ChangeRoute } from '../actions';
import styles from './PlaylistItem.module.css';

export function PlaylistItem({ video }) {
    const { dispatch } = useStore();

    const openVideo = (id) => {
        dispatch( new ChangeRoute({ path: 'watch', params: id }));
    }

    return (
        <div className={ styles.playlistItem } onClick = { () => openVideo(video.id) }>
                <div class={styles.thumbnail__img + " badge__container"} >
                    <img src={video.thumbnailURL} alt="" />
                    <span className={"badge " + styles.duration}>
                        23:47
                    </span>
                </div>
                <div class={ styles.card__content }>
                    <p class={ styles.card__title }>{video.title}</p>
                    <p class="card__meta">{ video.author }</p>
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