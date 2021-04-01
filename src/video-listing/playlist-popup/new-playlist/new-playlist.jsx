import { useState } from "react";
import { FaPlus } from 'react-icons/fa';

import styles from './new-playlist.module.css';

export function NewPlaylist({ createNewPlaylist }) {
    const [ newPlaylistFormVisible, setNewPlaylistFormVisible] = useState(false);
    const [ newPlaylist, setNewPlaylist] = useState('');

    const showPlayListForm = () => {
        setNewPlaylistFormVisible(true);
    }

    const createPlaylist = () => {
        if(!newPlaylist) {
            // Show error that title cannot be empty
            alert("Title cannot be empty")
            return;
        }
        createNewPlaylist(newPlaylist);
        setNewPlaylistFormVisible(false);
        setNewPlaylist("");
    }

    return (
        <div className="row">
            {
                !newPlaylistFormVisible? 
                <button className={ styles.new__playlist__btn + " col-12 btn btn--fluid" }>
                <FaPlus /> 
                <label className="playlist__label" onClick = { showPlayListForm }>Create a new playlist</label>
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