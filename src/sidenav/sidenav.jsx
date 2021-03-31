import { useStore } from '../store-context';
import './sidenav.css';
import { staticRoutes } from '../static-data';
import { ChangeRoute } from '../actions';

export function Sidenav() {
    const { state: { playlists }, dispatch} = useStore();
    
    function changeRoute(id) {
        dispatch( new ChangeRoute( id ) );
    }

    return (
        <aside>
            <ul className="list">
                {
                    staticRoutes.map( route => <li key = { route.id } className = "list__item" onClick = { () => { changeRoute(route.id) } } >{ route.title }</li>)
                }
            </ul>
            <ul className="list">
                {
                    playlists.map( playlist => <li key = { playlist.id } className = "list__item"  onClick = { () => { changeRoute(playlist.id) } }>{ playlist.title }</li>)
                }
            </ul>
        </aside>
    )
}