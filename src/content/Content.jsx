import styles from './Content.module.css';

import { useStore } from '../store-context';
import { VideoListing } from '../video-listing/videoListing';
import { NewVideo } from '../new-video/new-video'; 
import { Watch } from '../watch/watch';
import { VideoProvider } from '../video-context';
import { Playlist } from '../playlist/Playlist';
import { useEffect } from 'react';
import axios from 'axios';
import { InitializeVideoListing } from '../actions';

export function Content() {
    const { state: { route: { path, params} }, dispatch } = useStore();

    const getVideos = async () => {
        const res = await axios.get('/api/videos')
        dispatch(new InitializeVideoListing(res.data.videos) );
    }

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <div className = { styles.content }>
            { path === 'home' && <VideoListing />}
            { path === 'uploads/new' && 
                <VideoProvider>
                    <NewVideo />
                </VideoProvider>
             }
            { path === 'history' && <VideoListing /> }
            { path === 'playlist' && <Playlist /> }
            { path === 'watch' && <Watch id = { params } /> }
        </div>
    )
}