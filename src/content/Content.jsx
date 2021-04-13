import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import styles from './Content.module.css';
import { useStore } from '../contexts/store-context';
import { VideoListing } from '../video-listing/videoListing';
import { NewVideo } from '../new-video/new-video'; 
import { Watch } from '../watch/watch';
import { VideoProvider } from '../contexts/video-context';
import { Playlist } from '../playlist/Playlist';
import { InitializeVideoListing } from '../actions';
import { useNotifications } from '../contexts/notifications-context';
import { UseAxios } from '../custom-hooks/useAxios';

export function Content() {
    const { dispatch } = useStore();
    const { showNotification } = useNotifications();
    const apiCall = UseAxios();

    useEffect(() => {
        const getVideos = async () => {
            apiCall('getVideos', 'get', null, (res) => {
                dispatch(new InitializeVideoListing(res.data.videos) );
            }, (err) => {
                showNotification({type: 'ERROR', message: err.message})
            });
        }

        getVideos();
    }, []);

    return (
        <div className = { styles.content }>
             <Routes>
                <Route path="/" element={<VideoListing />} />
                <Route path="/home" element={<VideoListing />} />
                <Route path="/uploads/new" element={ <VideoProvider>
                    <NewVideo />
                </VideoProvider>} />
                <Route path="watch/:id" element={<Watch />} />
                <Route path="playlist/:id" element={<Playlist />} />
            </Routes>
            
            {/* { path === 'home' && <VideoListing />}
            { path === 'uploads/new' && 
                <VideoProvider>
                    <NewVideo />
                </VideoProvider>
             }
            { path === 'history' && <Playlist id = "history"  /> }
            { path === 'playlist' && <Playlist id = { params } /> }
            { path === 'watch' && <Watch id = { params } /> } */}
        </div>
    )
}