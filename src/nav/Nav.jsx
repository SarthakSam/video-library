import styles from './Nav.module.css';
import { FaSearch } from 'react-icons/fa';

export function Nav(x) {


    return (
        <nav className = "nav">
            <span className="nav__title">Streamit</span>
            <div className="nav__content">
                <ul className={"nav__list " + styles.search__input__container}>
                    <li className={"input input--icon " + styles.search__input}>
                        <input type="search" placeholder="search"/>
                        <FaSearch />
                    </li>
                </ul>
                <ul className="nav__list">
                    <li className="nav__item">Sarthak</li>                
                </ul>
            </div>
        </nav>
    )
}