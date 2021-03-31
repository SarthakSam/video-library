import { FaTimes } from 'react-icons/fa';
import { useStore } from '../../store-context';
import './playlist-popup.css';
import { AddToPlayList, CreatePlayList, RemoveFromPlayList } from '../../actions';
import { NewPlaylistForm } from './new-playlist-form/new-playlist-form';

export function PlayListPopup({ selectedVideo: video, setSelectedVideo }) {

    let { state: { playlists }, dispatch } = useStore();

    playlists = playlists.map( playlist => {
        return { ...playlist, containsCurrentVideo: playlist.items.some( item => item.id === video.id ) };
    })    

    const closePopup = () => {
        setSelectedVideo(null);
    }

    const addToPlayList = (item, checked) => {
        if(checked)
            dispatch( new AddToPlayList({playListId: item.id, video}))
        else
            dispatch( new RemoveFromPlayList({playListId: item.id, video}))
    }

  const createNewPlaylist = (playlistTitle) => {
        dispatch( new CreatePlayList({ title: playlistTitle, video }));
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
                <div className="popup__footer">
                    <NewPlaylistForm createNewPlaylist = { createNewPlaylist } />    
                </div>
            </div>
        </div>
    )
}