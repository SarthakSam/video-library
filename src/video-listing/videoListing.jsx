import { useState } from 'react';

import { useStore } from '../contexts/store-context';
import { Video } from './video/video';
import { PlayListPopup } from '../playlist-popup/playlist-popup';

export function VideoListing() {
    const { state: {videos} } = useStore();
    // const route = state.route;
    const [selectedVideo, setSelectedVideo] = useState(null);

    // const filterVideos = () => {
    //     if( route in state ) {
    //         return state[route];
    //     }
    //     let playlist = state.playlists.find( playlist => playlist.id === route );
    //     return playlist? playlist.items : state.videos
    // }

    // const filteredVideos = filterVideos();
    return (
        <>
           {
               (videos.length > 0)? 
                <ul className="row">
                    {
                        videos.map( video => <Video key = { video.id } video = { video } setSelectedVideo = { setSelectedVideo } />)
                    }
                </ul> : 
                <h2>Nothing to see here.</h2>

           }
            
            { selectedVideo && <PlayListPopup  selectedVideo = { selectedVideo } setSelectedVideo = { setSelectedVideo } /> }
        </>
    )
}