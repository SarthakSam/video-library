import { useEffect, useState } from "react";
import { YoutubePlayer } from "reactjs-media";
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { MdPlaylistPlay } from 'react-icons/md'
import { useParams } from 'react-router-dom';

import { PlaylistItem } from '../playlist-item/PlaylistItem';
import { PlayListPopup } from '../playlist-popup/playlist-popup';
import { useNotifications } from '../contexts/notifications-context';

import styles from './watch.module.css';
import { UseAxios } from '../custom-hooks/useAxios';
import { mapping } from '../api.config';
import { useAuth } from "../contexts/auth-context";

export function Watch() {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [isLikedOrDisliked, setIsLikedOrDisliked] = useState("");
    // const [isDisliked, setIsDisliked] = useState("");
    const apiCall = UseAxios();
    const { user } = useAuth();
    const { showNotification } = useNotifications();
    const LIKED = 'LIKED';
    const DISLIKED = 'DISLIKED';
    const NONE = 'NONE;'

    useEffect( () => {
        const getVideo = () => {
            apiCall('get', (res) => {
                setVideo( res.data.video );
            }, (err) => {
                showNotification({type: 'ERROR', message: err.message})
            }, `${mapping['getVideos']}/${id}`);
        }
        getVideo();
    }, [id]);

    useEffect(() => {
        const getVideos = () => {
            apiCall('get', (res) => {
                setVideos(res.data.videos);
            }, (err) => {
                showNotification({type: 'ERROR', message: err.message})
            }, mapping['getVideos']);
        }

        getVideos();
    }, []);

    useEffect( () => {
        if(!isLikedOrDisliked && video && user) {
            const isVideoLiked = findVideo(video.likedBy, user._id);
            if(isVideoLiked) {
                setIsLikedOrDisliked(LIKED);
                return;
            }
            const isVideoDisliked = findVideo(video.dislikedBy, user._id);
            if(isVideoDisliked) {
                setIsLikedOrDisliked(DISLIKED);
                return;
            }
        }
    }, [video, user]);

    // useEffect( () => {
    //     const isDisliked = video && user && !disliked && findVideo(video.dislikedBy, user._id);
    //     setIsDisliked(!!isDisliked);
    // }, [video, user]);

    const findVideo = (videos, id) => {
        const val = videos.find(temp => temp === id );
        return val
    }

    const showAddToPlaylistPopup = () => {
        setSelectedVideo(video);
    }

    const onLikeButtonClick = (e) => {
        const config = { headers: { authtoken: user._id } };
        const body = { isLiked: e.target.checked  };
        apiCall('post', (res) => {
            setIsLikedOrDisliked( body.isLiked? LIKED : NONE );
            setVideo(res.data.video);
        }, (err) => {
            showNotification({type: 'ERROR', message: err.message})
        }, `/videos/${id}/${mapping['likeDislikeVideo']}`, body, config);
    }

    const onDislikeButtonClick = (e) => {
        const config = { headers: { authtoken: user._id } };
        const body = { isDisliked: e.target.checked  };
        apiCall('post', (res) => {
            setIsLikedOrDisliked( body.isDisliked? DISLIKED : NONE );
            setVideo(res.data.video);
        }, (err) => {
            showNotification({type: 'ERROR', message: err.message})
        }, `/videos/${id}/${mapping['likeDislikeVideo']}`, body, config);
    }    

    return (
        <>
            {
                video && <div className={"row " + styles.watch}>
                            <div className={"card col-9 col-lg-12 col-md-12 col-sm-12 " + styles.video__container }>
                                <YoutubePlayer src={ video.videoURL } allowFullScreen width="100%" height="100%"/>
                                <div className={styles.card__body }>
                                    <p className="card__title">{ video.title }</p>
                                    <div className="row spaceBetween">
                                        <ul className={styles.watch__list}>
                                            <li className={ "card__meta " + styles.watch__list__item }>{ video.views } views</li>
                                            <li className={ "card__meta " + styles.watch__list__item }>{ video.uploadedDate }</li>
                                        </ul>
                                        <ul className={styles.watch__list } >
                                            <li className={ ` ${styles.watch__list__item} ${styles.button} ` }>
                                                <input type="checkbox" id="like__checkbox" className = { styles.state__checkbox } onChange = { onLikeButtonClick } checked = { isLikedOrDisliked === LIKED }/>
                                                <label htmlFor="like__checkbox" className = { `${isLikedOrDisliked === LIKED? styles.active : ''}` }>
                                                    <FaThumbsUp style = {{ margin: '0 0.2em' }}/> { video.likedBy.length }
                                                </label>
                                            </li>
                                            <li className={ ` ${styles.watch__list__item} ${styles.button} ` }>
                                                <input type="checkbox" id="dislike__checkbox" className = { styles.state__checkbox } onChange = { onDislikeButtonClick }  checked = { isLikedOrDisliked === DISLIKED }/>
                                                <label htmlFor="dislike__checkbox" className = { `${isLikedOrDisliked === DISLIKED? styles.active : ''}` }>
                                                    <FaThumbsDown style = {{ margin: '0 0.2em' }} />{ video.dislikedBy.length }
                                                </label>
                                            </li>
                                            <li className={ ` ${styles.watch__list__item} ${styles.button} ` } onClick = { showAddToPlaylistPopup }>
                                                <label><MdPlaylistPlay /> Watch</label>
                                            </li>
                                        </ul>

                                    </div>
                                    <hr/>
                                    <p className="card__description">{ video.description }</p>
                                    {/* <hr/> */}

                                </div>
                            </div>
                            <ul className="row col-3 col-lg-12 col-md-12 col-sm-12 p-0 m-0 " style={{ listStyle: 'none' }}>
                               { 
                                    videos.map( video => <li  key = { video._id } className="col-12 col-lg-4 col-md-6 col-sm-12 p-0">
                                         <PlaylistItem video = { video } />
                                    </li>)
                               }
                            </ul>
                            { selectedVideo && <PlayListPopup  selectedVideo = { selectedVideo } setSelectedVideo = { setSelectedVideo } /> }
                        </div>
            }
        </>
    )
}

                