import { Routes, Route } from 'react-router-dom';

import styles from './Content.module.css';
import { VideoListing } from '../video-listing/videoListing';
import { NewVideo } from '../new-video/new-video'; 
import { Watch } from '../watch/watch';
import { VideoProvider } from '../contexts/video-context';
import { Playlist } from '../playlist/Playlist';
import { PrivateRoute } from '../private-route/PrivateRoute';
import { Library } from '../library/Library';
import { Sidenav } from '../sidenav/sidenav';


export function Content() {
    return (
        <div className = { styles.container }>
            <div className={ styles.sidenav }>
                <Sidenav />
            </div>
            <div className={ styles.content }>
                <Routes>
                    <Route path="/" element={<VideoListing />} />
                    <Route path="/home" element={<VideoListing />} />
                    <PrivateRoute path="/uploads/new" element={ <NewVideo /> } />
                    <Route path="/watch/:id" element={
                        <VideoProvider>
                            <Watch />
                        </VideoProvider>
                    } />
                    <PrivateRoute path="/playlist/:id" element={<Playlist />} />
                    <PrivateRoute path="user/:id" element={<Library />} />
                </Routes>
            </div> 
        </div>
    )
}