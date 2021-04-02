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
import { useLoader } from '../loader-context';

export function Content() {
    const { state: { route: { path, params} }, dispatch } = useStore();
    const { setLoading } = useLoader();

    const getVideos = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/videos')
            dispatch(new InitializeVideoListing(res.data.videos) );
        }
        catch(err) {
            console.log("Something went wrong");
        }
        finally {
            setLoading(false);
        }

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
            { path === 'playlist' && <Playlist id = { params } /> }
            { path === 'watch' && <Watch id = { params } /> }
        </div>
    )
}