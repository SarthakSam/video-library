import { useEffect, useState } from "react";
import { YoutubePlayer } from "reactjs-media";
import { useParams } from 'react-router-dom';

import { PlaylistItem } from '../playlist-item/PlaylistItem';
import { useNotifications } from '../contexts/notifications-context';
import styles from './watch.module.css';
import { UseAxios } from '../custom-hooks/useAxios';
import { mapping } from '../api.config';
import { formatDate } from '../utils';
import { VideoDescription } from './video-description/VideoDescription';
import { PlayListPopup } from '../playlist-popup/playlist-popup';

export function Watch() {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [videos, setVideos] = useState([]);
    const apiCall = UseAxios();
    const { showNotification } = useNotifications();
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect( () => {
        const getVideo = () => {
            apiCall('get', (res) => {
                let video = res.data.video;
                video = {
                    ...res.data.video,
                    uploadedDate: formatDate(video.uploadedDate)
                }
                setVideo( video );
            }, (err) => {
                showNotification({type: 'ERROR', message: err.message})
            }, `${mapping['getVideos']}/${id}`);
        }
        getVideo();
    }, [id]);

    useEffect(() => {
        const getVideos = () => {
            apiCall('get', (res) => {
                const videos = res.data.videos.map( video => { 
                    video.uploadedDate = formatDate(video.uploadedDate);
                    return video;
                })
                setVideos(videos);
            }, (err) => {
                showNotification({type: 'ERROR', message: err.message})
            }, mapping['getVideos']);
        }

        getVideos();
    }, []);

    const openPlaylistPopup = () => {
        setSelectedVideo(video);
    }

    const setLikesAndDislikes = ({likedBy, dislikedBy}) => {
        setVideo( video => ({ ...video, likedBy, dislikedBy }) );
    }

    return (
        <>
            {
                video && <div className={"row " + styles.watch}>
                            <div className={"card col-8 col-xl-12 col-lg-12 col-md-12 col-sm-12 " + styles.video__container }>
                                <YoutubePlayer src={ video.videoURL } allowFullScreen width="100%" height="100%"/>
                                <VideoDescription { ...video } openPlaylistPopup = { openPlaylistPopup } setLikesAndDislikes = {setLikesAndDislikes} />
                            </div>
                            <ul className="row col-4 col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0 m-0 " style={{ listStyle: 'none' }}>
                               { 
                                    videos.map( video => <li  key = { video._id } className="col-12 col-xl-4 col-lg-4 col-md-6 col-sm-12 p-0">
                                         <PlaylistItem video = { video } />
                                    </li>)
                               }
                            </ul>
                        </div>
            }
            { selectedVideo && <PlayListPopup  selectedVideo = { selectedVideo } setSelectedVideo = { setSelectedVideo } /> }
        </>
    )
}

                