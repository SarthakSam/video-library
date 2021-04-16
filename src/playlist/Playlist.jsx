import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useStore } from "../contexts/store-context";
import { PlaylistItem } from '../playlist-item/PlaylistItem';

export function Playlist() {
    const { state } = useStore();
    const { id: playlistId } = useParams();
    const [ playlist, setPlaylist ] = useState(null);

    useEffect( () => {
        const curPlaylist = state.playlists.find( playlist => playlist._id === playlistId);
        setPlaylist( curPlaylist? curPlaylist : state[playlistId] );
    }, [state, playlistId] );

    return (
        <>
            <h2> { playlist && playlist.title } </h2>
            <br/>
            <ul className="row " style={{ listStyle: 'none' }}>
                { 
                    playlist && playlist.videos.length ? playlist.videos.map( video => <li  key = { video._id } className="col-4 col-lg-4 col-md-6 col-sm-12 p-0">
                            <PlaylistItem video = { video } />
                    </li>) : <h4>Playlist is empty</h4>
                }
            </ul>
        </>
    )
}