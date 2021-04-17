import { useState, useEffect } from 'react';

import { Video } from './video/video';
import { PlayListPopup } from '../playlist-popup/playlist-popup';
import { UseAxios } from '../custom-hooks/useAxios';
import { useNotifications } from '../contexts/notifications-context';
import { mapping } from '../api.config';

export function VideoListing() {
    const [videos, setVideos] = useState([]);
    const apiCall = UseAxios();
    const { showNotification } = useNotifications();


    const [selectedVideo, setSelectedVideo] = useState(null);

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


    return (
        <>
           {
               (videos.length > 0)? 
                <ul className="row">
                    {
                        videos.map( video => <Video key = { video._id } video = { video } setSelectedVideo = { setSelectedVideo } />)
                    }
                </ul> : 
                <h2>Nothing to see here.</h2>

           }
            
            { selectedVideo && <PlayListPopup  selectedVideo = { selectedVideo } setSelectedVideo = { setSelectedVideo } /> }
        </>
    )
}