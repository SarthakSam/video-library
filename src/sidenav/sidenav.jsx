import { useStore } from '../store-context';
import styles from './sidenav.module.css';
import { staticRoutes } from '../static-data';
import { ChangeRoute } from '../actions';

export function Sidenav() {
    const { state: { playlists }, dispatch} = useStore();
    
    function changeRoute(id) {
        dispatch( new ChangeRoute( id ) );
    }

    return (
        <aside>
            <ul className={ styles.list }>
                {
                    staticRoutes.map( route => <li key = { route.id } className = { styles.list__item } onClick = { () => { changeRoute(route.id) } } >{ route.title }</li>)
                }
            </ul>
            <ul className={ styles.list }>
                {
                    playlists.map( playlist => <li key = { playlist.id } className = { styles.list__item }  onClick = { () => { changeRoute(playlist.id) } }>{ playlist.title }</li>)
                }
            </ul>
        </aside>
    )
}