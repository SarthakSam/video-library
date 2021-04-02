import { useStore } from '../store-context';
import styles from './sidenav.module.css';
import { staticRoutes } from '../static-data';
import { ChangeRoute } from '../actions';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';

export function Sidenav() {
    const { state: { playlists }, dispatch} = useStore();
    
    function changeRoute(route) {
        dispatch( new ChangeRoute( route ) );
    }

    // const toggleNav = () => {

    // }

    return (
        <aside className = { styles.sidenav }>
            <input type="checkbox" id="sidenav__toggle" className={  styles.sidenav__toggle}/>
            <label htmlFor="sidenav__toggle" className={ styles.sidenav__expand }>
                <MdKeyboardArrowRight className = { styles.sidenav__expandIcon } />
            </label>
            <ul className={ styles.sidenav__list }>
                {
                    staticRoutes.map( route => 
                    <li key = { route.id } className = { styles.sidenav__listItem + " " + styles.active } onClick = { () => { changeRoute( route.goTo) } } >
                        <FaHome className={styles.sidenav__listItem__icon} />
                        <p className={styles.sidenav__listItem__text}>{ route.title }</p>
                    </li>)
                }
            </ul>
            <ul className={ styles.sidenav__list }>
                {
                    playlists.map( playlist => 
                    <li key = { playlist.id } className = { styles.sidenav__listItem }  onClick = { () => { changeRoute({ path: 'playlist', params: playlist.id }) } }>
                        <FaHome className={styles.sidenav__listItem__icon} />
                        <p className={styles.sidenav__listItem__text}>{ playlist.title }</p>
                    </li>)
                }
            </ul>
        </aside>
    )
}