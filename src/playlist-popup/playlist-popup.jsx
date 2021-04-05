import { FaTimes } from 'react-icons/fa';
import { useStore } from '../store-context';
import styles from './playlist-popup.module.css';
import { AddToPlayList, CreatePlayList, RemoveFromPlayList } from '../actions';
import { NewPlaylist } from './new-playlist/new-playlist';

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
            dispatch( new AddToPlayList({playlistId: item.id, video}))
        else
            dispatch( new RemoveFromPlayList({playlistId: item.id, video}))
    }

  const createNewPlaylist = (playlistTitle) => {
        dispatch( new CreatePlayList({ title: playlistTitle, video }));
        closePopup();
    }


    return (
        <div className={ styles.popup__container + " popup__container popup--small" }>
            <div className="popup">
                <div className="popup__header">
                    <p className="popup__title">Save to...</p>   
                    <FaTimes onClick = { closePopup } style = {{ cursor: 'pointer'}} tabIndex = "1"/>
                </div>
                <div className="popup__body">
                    <ul className={ styles.playlist }>
                        {
                            playlists.map( item => 
                            <li key = { item.id} className={ styles.playlist__item }>
                                <input type="checkbox" id={item.id} onChange = { (e) => addToPlayList(item, e.target.checked) } defaultChecked = { item.containsCurrentVideo } />
                                <label className={styles.playlist__label} htmlFor={item.id}>{item.title}</label>
                            </li> )
                        }
                    </ul>
                </div>
                <div className={styles.popup__footer + " popup__footer"}>
                    <NewPlaylist createNewPlaylist = { createNewPlaylist } />    
                </div>
            </div>
        </div>
    )
}