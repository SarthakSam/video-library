import { useStore } from '../store-context';
import './sidenav.css';

export function Sidenav() {
    const { state: { playlists }} = useStore();
    return (
        <aside>
            <ul className="list">
                <li className="list__item">Home</li>
                <li className="list__item">History</li>
                <li className="list__item">Your videos</li>
            </ul>
            <ul className="list">
                {
                    playlists.map( playlist => <li key = { playlist.id } className = "list__item" >{ playlist.title }</li>)
                }
            </ul>
        </aside>
    )
}