import { useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import styles from './Content.module.css';
import { useStore } from '../store-context';
import { VideoListing } from '../video-listing/videoListing';
import { NewVideo } from '../new-video/new-video'; 
import { Watch } from '../watch/watch';
import { VideoProvider } from '../video-context';
import { Playlist } from '../playlist/Playlist';
import { InitializeVideoListing } from '../actions';
import { useLoader } from '../loader-context';
import { useNotifications } from '../notifications-context';

export function Content() {
    const { dispatch } = useStore();
    const { setLoading } = useLoader();
    const { showNotification } = useNotifications();

    const getVideos = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/videos')
            dispatch(new InitializeVideoListing(res.data.videos) );
        }
        catch(err) {
            showNotification({type: 'ERROR', message: err})
        }
        finally {
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     setInterval(() => {
    //         let no = Math.floor(Math.random() * 3);
    //         console.log(no)
    //         let types = ["SUCCESS", "WARNING", "ERROR"];
    //         showNotification({ type: types[no] ,message: "Hi there aio aio"});
    //     }, 2000);
    // }, [])

    useEffect(() => {
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