import styles from './Content.module.css';

import { useStore } from '../store-context';
import { VideoListing } from '../video-listing/videoListing';
import { NewVideo } from '../new-video/new-video'; 
import { Sidenav } from '../sidenav/sidenav';

export function Content({ sidenavState }) {
    const { state: { route: { path, params} } } = useStore();


    return (
        <div className={ styles.content }>
            {/* { path === 'home' && <VideoListing />}
            { path === 'uploads/new' && <NewVideo /> } */}
            I am content
        </div>
    )
}