import { useEffect, useState } from "react";
import { useStore } from "../store-context";
import { PlaylistItem } from '../playlist-item/PlaylistItem';
import styles from './Playlist.module.css';

export function Playlist({ id: playlistId }) {
    const { state } = useStore();
    const [ videos, setVideos ] = useState(null);

    useEffect( () => {
        const curPlaylist = state.playlists.find( playlist => playlist.id === playlistId);
        setVideos( curPlaylist? curPlaylist.items : state[playlistId] );
    } );

    return (
        <ul className="row " style={{ listStyle: 'none' }}>
            { 
                videos && videos.map( video => <li  key = { video.id } className="col-4 col-lg-4 col-md-6 col-sm-12 p-0">
                        <PlaylistItem video = { video } />
                </li>)
            }
        </ul>
    )
}