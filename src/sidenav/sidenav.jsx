import { useStore } from '../store-context';
import styles from './sidenav.module.css';
import { staticRoutes } from '../static-data';
import { ChangeRoute } from '../actions';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';

export function Sidenav() {
    const { state: { playlists }, dispatch} = useStore();
    
    function changeRoute(id) {
        dispatch( new ChangeRoute( id ) );
    }

    // const toggleNav = () => {

    // }

    return (
        <aside>
            <input type="checkbox" id="sidenav__toggle" className={  styles.sidenav__toggle}/>
            <label htmlFor="sidenav__toggle" className={ styles.sidenav__expand }>
                <MdKeyboardArrowRight className = { styles.sidenav__expandIcon } />
            </label>
            <ul className={ styles.list }>
                {
                    staticRoutes.map( route => 
                    <li key = { route.id } className = { styles.list__item + " " + styles.active } onClick = { () => { changeRoute(route.id) } } >
                        <FaHome className={styles.list__item__icon} />
                        <p className={styles.list__item__text}>{ route.title }</p>
                    </li>)
                }
            </ul>
            <ul className={ styles.list }>
                {
                    playlists.map( playlist => 
                    <li key = { playlist.id } className = { styles.list__item }  onClick = { () => { changeRoute(playlist.id) } }>
                        <FaHome className={styles.list__item__icon} />
                        <p className={styles.list__item__text}>{ playlist.title }</p>
                    </li>)
                }
            </ul>
        </aside>
    )
}