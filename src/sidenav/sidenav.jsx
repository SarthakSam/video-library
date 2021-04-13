import { NavLink } from 'react-router-dom';

import { useStore } from '../contexts/store-context';
import styles from './sidenav.module.css';
import { staticRoutes } from '../static-data';
import { ChangeRoute, InitializePlaylists } from '../actions';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaHome, FaFileVideo, FaCloudUploadAlt, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { MdHistory, MdPlaylistPlay } from 'react-icons/md'
import { useEffect } from 'react';
import { useNotifications } from '../contexts/notifications-context';
import { UseAxios } from '../custom-hooks/useAxios';

export function Sidenav() {
    const { state: { playlists }, dispatch} = useStore();
    const apiCall = UseAxios();
    const { showNotification } = useNotifications();

    const iconsMapping = {
        'FaHome': <FaHome />,
        'MdHistory': <MdHistory />,
        'FaCloudUploadAlt': <FaCloudUploadAlt />,
        'FaFileVideo': <FaFileVideo />,
        'FaThumbsUp': <FaThumbsUp />,
        'FaThumbsDown': <FaThumbsDown />,
    }
    
    function changeRoute(route) {
        dispatch( new ChangeRoute( route ) );
    }
   
    useEffect( () => {
        const getPlaylists = async () => {
            apiCall('getPlaylists', null, (res) => {
                dispatch(new InitializePlaylists(res.data.playlists) );
            }, (err) => {
                showNotification({type: 'ERROR', message: err.message});
            })
        }
        getPlaylists();
    }, []);

    return (
        <aside className = { styles.sidenav }>
            <input type="checkbox" id="sidenav__toggle" className={  styles.sidenav__toggle} defaultChecked/>
            <label htmlFor="sidenav__toggle" className={ styles.sidenav__expand }>
                <MdKeyboardArrowRight className = { styles.sidenav__expandIcon } />
            </label>
            <ul className={ styles.sidenav__list }>
                {
                    staticRoutes.map( route => 
                    <li key = { route.id } onClick = { () => { changeRoute( route.goTo) } } >
                        <NavLink to={ route.goTo } className = { styles.sidenav__listItem + " " } activeClassName={ styles.active }>
                            <span className={styles.sidenav__listItem__icon}>
                                { iconsMapping[route.icon] }
                            </span>
                            <p className={styles.sidenav__listItem__text}>{ route.title }</p>
                        </NavLink>
                    </li>)
                }
            </ul>
            <ul className={ styles.sidenav__list }>
                {
                    playlists.map( playlist => 
                    <li key = { playlist.id } onClick = { () => { changeRoute({ path: 'playlist', params: playlist.id }) } }>
                        <NavLink to={ `playlist/${playlist.id}` } className = { styles.sidenav__listItem + " " } activeClassName={ styles.active }>
                            <span className={styles.sidenav__listItem__icon}>
                                <MdPlaylistPlay />
                            </span>
                            <p className={styles.sidenav__listItem__text}>{ playlist.title }</p>
                        </NavLink>
                    </li>)
                }
            </ul>
        </aside>
    )
}