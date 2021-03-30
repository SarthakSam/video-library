import { FaEllipsisV } from 'react-icons/fa';

import './video.css'
import { Menu } from '../../menu/menu';


export function Video( { video } ) {

    const options = [
        {title: 'Save To Watch Later', action: console.log},
        {title: 'Save To Playlist', action: console.log },
    ]

    const showMenu = () => {
        console.log( video )        
    }

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