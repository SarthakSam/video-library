import { Routes, Route } from 'react-router-dom';

import styles from './Content.module.css';
import { VideoListing } from '../video-listing/videoListing';
import { NewVideo } from '../new-video/new-video'; 
import { Watch } from '../watch/watch';
import { VideoProvider } from '../contexts/video-context';
import { Playlist } from '../playlist/Playlist';
import { PrivateRoute } from '../private-route/PrivateRoute';
import { Signin } from '../signin/Signin';
import { Signup } from '../signup/Signup';

export function Content() {
    return (
        <div className = { styles.content }>
             <Routes>
                <Route path="/" element={<VideoListing />} />
                <Route path="/home" element={<VideoListing />} />
                <PrivateRoute path="/uploads/new" element={ <VideoProvider>
                    <NewVideo />
                </VideoProvider>
                } />
                <Route path="/watch/:id" element={<Watch />} />
                <PrivateRoute path="/playlist/:id" element={<Playlist />} />
                <PrivateRoute path="/uploads" element={<Playlist apiEndPoint = "uploads" />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
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