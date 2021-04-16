import { useState } from "react";
import { FaPlus } from 'react-icons/fa';

import styles from './new-playlist.module.css';
import { useNotifications } from "../../contexts/notifications-context";
import { UseAxios } from '../../custom-hooks/useAxios';
import { mapping } from '../../api.config';

export function NewPlaylist({ createNewPlaylist }) {
    const [ newPlaylistFormVisible, setNewPlaylistFormVisible] = useState(false);
    const [ newPlaylist, setNewPlaylist] = useState('');
    const { showNotification } = useNotifications();
    const apiCall = UseAxios();

    const showPlayListForm = () => {
        setNewPlaylistFormVisible(true);
    }

    const createPlaylist = async () => {
        if(!newPlaylist) {
            // Show error that title cannot be empty
            alert("Title cannot be empty")
            return;
        }
        const body = {
            title: newPlaylist,
            videos: []
        }
        apiCall(mapping['getPlaylists'], 'post', body, (resp) => {
            // showNotification({ type: 'SUCCESS', message: 'Playlist created successfully'});
            createNewPlaylist(resp.data.playlist);  
            setNewPlaylistFormVisible(false);
            setNewPlaylist("");
        }, (err) => {
            console.log(err);
            showNotification({ type: 'ERROR', message: err.message});
        })
    }

    return (
        <div className="row">
            {
                !newPlaylistFormVisible? 
                <button className={ styles.new__playlist__btn + " col-12 btn btn--fluid" }>
                <FaPlus /> 
                <label className={ styles.playlist__label} onClick = { showPlayListForm }>Create a new playlist</label>
                </button> : 
                <form className ="row col-12 new__playlist">
                    <label htmlFor="new-playlist">Name</label>
                <input className={ styles.new__playlist__input +  " col-12" } value = { newPlaylist } placeholder = "Enter playlist name" name = "new-label" type="text" onChange = {(e) => { setNewPlaylist(e.target.value) }} />
                <button className="btn btn--fluid btn--primary btn--inverted" type="button" onClick = { createPlaylist } >CREATE</button>
                </form>
            }
        </div>
    )
}