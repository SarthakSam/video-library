import { useState } from 'react';

import { useStore } from '../store-context';
import { VideoItem } from './video-item/video-item';
import { PlayListPopup } from './playlist-popup/playlist-popup';

export function VideoListing() {
    const { state } = useStore();
    const route = state.route;
    const [selectedVideo, setSelectedVideo] = useState(null);

    const filterVideos = () => {
        if( route in state ) {
            return state[route];
        }
        let playlist = state.playlists.find( playlist => playlist.id === route );
        return playlist? playlist.items : state.videos
    }

    const filteredVideos = filterVideos();
    return (
        <div>
           {
               (filteredVideos.length > 0)? 
                <ul className="row">
                    {
                        filteredVideos.map( video => <VideoItem key = { video.id } video = { video } setSelectedVideo = { setSelectedVideo } />)
                    }
                </ul> : 
                <h2>Nothing to see here.</h2>

           }
            
            { selectedVideo && <PlayListPopup  selectedVideo = { selectedVideo } setSelectedVideo = { setSelectedVideo } /> }
        </div>
    )
}