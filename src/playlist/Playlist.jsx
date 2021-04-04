import { useEffect, useState } from "react";
import { RemoveFromPlayList } from "../actions";
import { useStore } from "../store-context";
import { PlaylistItem } from '../playlist-item/PlaylistItem';
import styles from './Playlist.module.css';

export function Playlist({ id: playlistId }) {
    const { state, dispatch } = useStore();
    const [ videos, setVideos ] = useState(null);

    useEffect( () => {
        const curPlaylist = state.playlists.find( playlist => playlist.id === playlistId);
        setVideos( curPlaylist? curPlaylist.items : state[playlistId] );
    } );

    const removeFromPlayList = (video) => {
        dispatch( new RemoveFromPlayList( { playlistId, video }) );
    }

    return (
        <div className="row">
            <ul className={ "row col-12 " + styles.playlist}>
                {
                    videos? 
                    videos.map( video => <PlaylistItem key = { video.id } video = { video } removeFromPlayList = { removeFromPlayList } /> )
                    :
                    <p>Loading...</p>
                }
            </ul>
        </div>
    )
}