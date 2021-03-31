import { useState } from 'react';

import { useStore } from '../store-context';
import { Video } from './video/Video';
import { PlayListPopup } from '../playlist-popup/playlist-popup';

export function VideoListing() {
    const { state: { videos } } = useStore();
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <div>
            <ul className="row">
                {
                    videos.map( video => <Video key = { video.id } video = { video } setSelectedVideo = { setSelectedVideo } />)
                }
            </ul>
            { selectedVideo && <PlayListPopup  selectedVideo = { selectedVideo } setSelectedVideo = { setSelectedVideo } /> }
        </div>
    )
}