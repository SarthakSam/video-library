import { useEffect, useState } from "react";
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { MdPlaylistPlay } from 'react-icons/md'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import { useNotifications } from '../../contexts/notifications-context';
import styles from './VideoDescription.module.css';
import { UseAxios } from '../../custom-hooks/useAxios';
import { getUrl } from '../../api.config';
import { useAuth } from "../../contexts/auth-context";
import { SetLikesAndDislikes } from '../../actions';
import { useVideo } from "../../contexts/video-context";

export function VideoDescription( { openPlaylistPopup } ) {

    const [isLikedOrDisliked, setIsLikedOrDisliked] = useState("");
    const apiCall = UseAxios();
    const { user } = useAuth();
    const { showNotification } = useNotifications();
    const LIKED = 'LIKED';
    const DISLIKED = 'DISLIKED';
    const NONE = 'NONE;'
    const { dispatch, state: { video: {
        _id : id, title, description, author, views, uploadedDate, likedBy, dislikedBy, 
    } } } = useVideo();

    useEffect( () => {
        if(!isLikedOrDisliked && user) {
            const isVideoLiked = findVideo(likedBy, user._id);
            if(isVideoLiked) {
                setIsLikedOrDisliked(LIKED);
                return;
            }
            const isVideoDisliked = findVideo(dislikedBy, user._id);
            if(isVideoDisliked) {
                setIsLikedOrDisliked(DISLIKED);
                return;
            }
        }
    }, [user]);

    const findVideo = (arr, id) => {
        const val = arr.find(temp => temp === id );
        return val
    }

    const setLikesAndDislikes = ({likedBy, dislikedBy}) => {
        dispatch( new SetLikesAndDislikes( { likedBy, dislikedBy } ));
    }

    const showAddToPlaylistPopup = () => {
        if(!user) {
            showNotification({type: 'ERROR', message: 'Please signin to make your own playlist'});
            return;
        }
        openPlaylistPopup();
    }

    const onLikeButtonClick = (e) => {
        if(!user) {
            showNotification({type: 'ERROR', message: 'Like this video? Please signin to make your opinion count'});
            return;
        }
        const config = { headers: { authtoken: user._id } };
        const body = { isLiked: e.target.checked  };
        apiCall('post', (res) => {
            setIsLikedOrDisliked( body.isLiked? LIKED : NONE );
            setLikesAndDislikes(res.data.video);
        }, (err) => {
            showNotification({type: 'ERROR', message: err.message})
        }, getUrl('likeDislikeVideo', { videoId: id }), body, config);
    }

    const onDislikeButtonClick = (e) => {
        if(!user) {
            showNotification({type: 'ERROR', message: 'Dislike this video? Please signin to make your opinion count'});
            return;
        }
        const config = { headers: { authtoken: user._id } };
        const body = { isDisliked: e.target.checked  };
        apiCall('post', (res) => {
            setIsLikedOrDisliked( body.isDisliked? DISLIKED : NONE );
            setLikesAndDislikes(res.data.video);
        }, (err) => {
            showNotification({type: 'ERROR', message: err.message})
        }, getUrl('likeDislikeVideo', { videoId: id }), body, config);
    }    



    return (
        <div className={styles.card__body }>
            <p className="card__title">{ title }</p>
            <p className="card__meta">{ author?.username }</p>
            <div className="row spaceBetween">
                <ul className={styles.watch__list}>
                    <li className={ "card__meta " + styles.watch__list__item }>{ views } views</li>
                    <li className={ "card__meta " + styles.watch__list__item }>{ uploadedDate }</li>
                </ul>
                <ul className={styles.watch__list } >
                    <li className={ ` ${styles.watch__list__item} ${styles.button} ` }>
                        <input type="checkbox" id="like__checkbox" className = { styles.state__checkbox } onChange = { onLikeButtonClick } checked = { isLikedOrDisliked === LIKED }/>
                        <label htmlFor="like__checkbox" className = { `${isLikedOrDisliked === LIKED? styles.active : ''}` }>
                            <FaThumbsUp style = {{ margin: '0 0.2em' }}/> { likedBy.length }
                        </label>
                    </li>
                    <li className={ ` ${styles.watch__list__item} ${styles.button} ` }>
                        <input type="checkbox" id="dislike__checkbox" className = { styles.state__checkbox } onChange = { onDislikeButtonClick }  checked = { isLikedOrDisliked === DISLIKED }/>
                        <label htmlFor="dislike__checkbox" className = { `${isLikedOrDisliked === DISLIKED? styles.active : ''}` }>
                            <FaThumbsDown style = {{ margin: '0 0.2em' }} />{ dislikedBy.length }
                        </label>
                    </li>
                    <li className={ ` ${styles.watch__list__item} ${styles.button} ` } onClick = { showAddToPlaylistPopup }>
                        <label><MdPlaylistPlay /> Save</label>
                    </li>
                </ul>

            </div>
            <hr/>
            <p className="card__description"><ReactMarkdown remarkPlugins={[gfm]} children={description} /></p>
        {/* <hr/> */}
    </div>
    )
}
