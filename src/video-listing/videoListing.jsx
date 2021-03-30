import { useState } from 'react';
import { PlayListPopup } from '../playlist-popup/playlist-popup';
import { useStore } from '../store-context';
import { Video } from './video/Video';

export function VideoListing() {
    const { state: { videos } } = useStore();
    const [ selectedVideo, setSelectedVideo ] = useState(null);
    return (
        <div>
            <ul className="row">
                {
                    videos.map( video => <Video key = { video.id } video = { video } onSelection = {setSelectedVideo} />)
                }
            </ul>
            <PlayListPopup  selectedVideo = { selectedVideo } setSelectedVideo = { setSelectedVideo }  />
        </div>

    )
}