import styles from './Content.module.css';

import { useStore } from '../store-context';
import { VideoListing } from '../video-listing/videoListing';
import { NewVideo } from '../new-video/new-video'; 
import { Watch } from '../watch/watch';
export function Content() {
    const { state: { route: { path, params} } } = useStore();

    console.log(path, params)

    return (
        <div className = { styles.content }>
            { path === 'home' && <VideoListing />}
            { path === 'uploads/new' && <NewVideo /> }
            { path === 'history' && <VideoListing /> }
            {/* { path === 'playlist' && <PLaylist /> } */}
            { path === 'watch' && <Watch id = { params } /> }
        </div>
    )
}