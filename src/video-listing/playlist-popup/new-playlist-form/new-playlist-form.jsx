import { useState } from "react";
import { FaPlus } from 'react-icons/fa';

export function NewPlaylistForm({ createNewPlaylist }) {
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
                <button className="col-12 btn btn--fluid new__playlist__btn">
                <FaPlus /> 
                <label className="playlist__label" onClick = { showPlayListForm }>Create a new playlist</label>
                </button> : 
                <form className ="row col-12 new__playlist">
                    <label htmlFor="new-playlist">Name</label>
                <input className="col-12 new__playlist__input" value = { newPlaylist } placeholder = "Enter playlist name" name = "new-label" type="text" onChange = {(e) => { setNewPlaylist(e.target.value) }} />
                <button className="btn btn--fluid btn--primary btn--inverted" type="button" onClick = { createPlaylist } >CREATE</button>
                </form>
            }
        </div>
    )
}