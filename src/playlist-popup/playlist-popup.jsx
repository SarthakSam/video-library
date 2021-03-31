import { FaTimes, FaPlus } from 'react-icons/fa';
import { useStore } from '../store-context';
import './playlist-popup.css';
import { AddToPlayList, CreatePlayList, RemoveFromPlayList } from '../actions';
import { useState } from 'react';

export function PlayListPopup({ selectedVideo: video, setSelectedVideo }) {

    let { state: { playlists }, dispatch } = useStore();
    const [ newPlaylistFormVisible, setNewPlaylistFormVisible] = useState(false);
    const [ newPlaylist, setNewPlaylist] = useState('');

    playlists = playlists.map( playlist => {
        return { ...playlist, containsCurrentVideo: playlist.items.some( item => item.id === video.id ) };
    })    

    // console.log(playlists);

    const closePopup = () => {
        setSelectedVideo(null);
    }

    const addToPlayList = (item, checked) => {
        if(checked)
            dispatch( new AddToPlayList({playListId: item.id, video}))
        else
            dispatch( new RemoveFromPlayList({playListId: item.id, video}))
    }

    const showPlayListForm = () => {
        setNewPlaylistFormVisible(true);
    }

    const createNewPlaylist = () => {
        if(!newPlaylist) {
            // Show error that title cannot be empty
            alert("Title cannot be empty")
            return;
        }
        dispatch( new CreatePlayList({ title: newPlaylist, video }));
        setNewPlaylistFormVisible(false);
        setNewPlaylist("");
        closePopup();
    }

    return (
        <div className="popup__container popup--small">
            <div className="popup">
                <div className="popup__header">
                    <p className="popup__title">Save to...</p>   
                    <FaTimes onClick = { closePopup } style = {{ cursor: 'pointer'}} tabIndex = "1"/>
                </div>
                <div className="popup__body">
                    <ul className="playlist">
                        {
                            playlists.map( item => 
                            <li key = { item.id} className="playlist__item">
                                <input type="checkbox" id={item.id} onChange = { (e) => addToPlayList(item, e.target.checked) } defaultChecked = { item.containsCurrentVideo } />
                                <label className="playlist__label" htmlFor={item.id}>{item.title}</label>
                            </li> )
                        }
                    </ul>
                </div>
                <div className="popup__footer row">
                  {
                      !newPlaylistFormVisible? 
                      <button className="col-12 btn btn--fluid new__playlist__btn">
                      <FaPlus /> 
                      <label className="playlist__label" onClick = { showPlayListForm }>Create a new playlist</label>
                      </button> : 
                      <form className ="row col-12 new__playlist">
                          <label htmlFor="new-playlist">Name</label>
                        <input className="col-12 new__playlist__input" value = { newPlaylist } placeholder = "Enter playlist name" name = "new-label" type="text" onChange = {(e) => { setNewPlaylist(e.target.value) }} />
                        <button className="btn btn--fluid btn--primary btn--inverted" type="button" onClick = { createNewPlaylist } >CREATE</button>
                    </form>
                  } 
                </div>
            </div>
        </div>
    )
}