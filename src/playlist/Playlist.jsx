import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../contexts/auth-context";
import { useNotifications } from "../contexts/notifications-context";

import { useStore } from "../contexts/store-context";
import { UseAxios } from "../custom-hooks/useAxios";
import { PlaylistItem } from '../playlist-item/PlaylistItem';

export function Playlist({ apiEndPoint }) {
    const { state } = useStore();
    const { id: playlistId } = useParams();
    const [ playlist, setPlaylist ] = useState(null);
    const { user } = useAuth();
    const apiCall = UseAxios();
    const { showNotification } = useNotifications();

    useEffect( () => {
        if(playlistId) {
            const curPlaylist = state.playlists.find( playlist => playlist._id === playlistId);
            setPlaylist( curPlaylist? curPlaylist : state[playlistId] );    
        }
    }, [state, playlistId] );

    useEffect( () => {
        const config = { headers: { authtoken: user._id } };
        apiCall('get', (res) => {
            setPlaylist( res.data );
        }, (err) => {
            showNotification({ type: 'ERROR', message: 'Something went wrong'});
        }, apiEndPoint ,config);
    }, [apiEndPoint] );

    return (
        <>
            <h2> { playlist && playlist.title } </h2>
            <br/>
            <ul className="row " style={{ listStyle: 'none' }}>
                { 
                    playlist && playlist.videos.length ? playlist.videos.map( video => <li  key = { video._id } className="col-4 col-lg-4 col-md-6 col-sm-12 p-0">
                            <PlaylistItem video = { video } />
                    </li>) : <h4>Nothing to show Here</h4>
                }
            </ul>
        </>
    )
}