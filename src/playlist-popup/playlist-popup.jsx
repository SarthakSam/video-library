import { FaTimes, FaPlus } from 'react-icons/fa';
import { useStore } from '../store-context';
import './playlist-popup.css';
import { AddToPlayList } from '../actions';

export function PlayListPopup({ selectedVideo: video, setSelectedVideo }) {

    const { state: { playlists }, dispatch } = useStore();

    const closePopup = () => {
        setSelectedVideo(null)
    }

    const addToPlayList = (item) => {
        dispatch( new AddToPlayList({playListId: item.id, video}))
    }

    const createNewPlayList = () => {

    }

    return (
        <div className="popup__container popup--small" style = {{ display: video? 'initial' : 'none' }}>
            <div className="popup">
                <div className="popup__header">
                    <p className="popup__title">Save to...</p>
                    <FaTimes onClick = { closePopup } style = {{ cursor: 'pointer'}}/>
                </div>
                <div className="popup__body">
                    <ul className="playlist">
                        {
                            playlists.map( item => <li key = { item.id} className="playlist__item">
                                <input type="checkbox" id={item.id} onClick = { () => addToPlayList(item) } />
                                <label className="playlist__label" htmlFor={item.id}>{item.title}</label>
                            </li> )
                        }
                    </ul>
                </div>
                <div className="popup__footer">
                   <div className="new__playlist">
                       <FaPlus /> 
                       <label className="playlist__label" onClick = { createNewPlayList }>Create a new playlist</label>
                   </div>
                </div>
            </div>
        </div>
    )
}