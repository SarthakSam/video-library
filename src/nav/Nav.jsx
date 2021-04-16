import { Link } from 'react-router-dom';

import styles from './Nav.module.css';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../contexts/auth-context';

export function Nav() {
    const { user } = useAuth();

    return (
        <nav className = "nav">
            <span className={`nav__title ${ styles.nav__title }`}>
                <img src="logo.jpg" alt=""/>    
                <Link to="/" >Streamit</Link>
            </span>
            <div className="nav__content">
                <ul className={"nav__list " + styles.search__input__container}>
                    <li className={"input input--icon " + styles.search__input}>
                        <input type="search" placeholder="search"/>
                        <FaSearch />
                    </li>
                </ul>
                <ul className="nav__list">
                    <li className="nav__item">
                        {
                          user? <Link to="/" >Sarthak</Link> :
                          <Link to="/login" >Login</Link>
                        }
                    </li>                
                </ul>
            </div>
        </nav>
    )
}