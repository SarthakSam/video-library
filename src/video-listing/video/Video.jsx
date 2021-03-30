import { FaEllipsisV } from 'react-icons/fa';

import './video.css'
import { Menu } from '../../menu/menu';
import { useStore } from '../../store-context';
import { AddToPlayList } from '../../actions';


export function Video( { video, onSelection } ) {
    const { dispatch } = useStore();

    const saveToWatchLater = () => {
        dispatch( new AddToPlayList({ id: 1, video }) );
    }

    const saveToPlayList = () => {
        onSelection(video);
    }

    const options = [
        {title: 'Save To Watch Later', action: saveToWatchLater},
        {title: 'Save To Playlist', action: saveToPlayList },
    ]

    return (
        <li className = "card col-3 col-lg-4 col-md-6 col-sm-12">
            <div className="card__img badge__container">
                <img src={ video.imageUrl} alt=""/>
                <span className="badge bg-black text-white">{ video.duration }</span>
            </div>
            <p className="card__title">{ video.title }</p>
            <p className="card__meta">{ video.author }</p>
            <span className="card__meta">{ video.views }</span>
            <span className="card__meta">{ video.uploadedDate }</span>
            <Menu icon = { <FaEllipsisV/> } options = { options} />
        </li>
    )
}