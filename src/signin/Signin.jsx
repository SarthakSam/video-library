import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useAuth } from '../contexts/auth-context';
import styles from './Signin.module.css';
import { UseAxios } from '../custom-hooks/useAxios';
import { getUrl } from '../api.config';
import { useNotifications } from '../contexts/notifications-context';

export function Signin() {
    const { setUser } = useAuth();
    const {state } = useLocation();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const apiCall = UseAxios();
    const {showNotification} = useNotifications();

    const signin = (event) => {
        event.preventDefault();
        apiCall('post', (res) => {
            setUser(res.data.user);
            navigate(state?.from? state.from : '/home' );
            showNotification({ type: 'SUCCESS', message: res.data.message});
        }, (err) => {
            showNotification({ type: 'ERROR', message: err});
        }, getUrl('signin'), { username, password }, null)
    }

    return (
        <div className = { styles.container }>
                <video autoPlay muted loop className = { styles.background }>
                     <source src="/background7.mp4" type="video/mp4" />
                </video>
                <div className={`row ${styles.form__container}`}>
                    <form className={`col-6 col-lg-8 col-md-10 col-sm-12 ${styles.form}`} onSubmit = {signin}>
                        <div className={`${styles.title}`}>
                            <h2 className="h2" style={{}}>Streamit</h2>
                            <br/>
                            <h3 className="h3">Sign in</h3>
                            <br/>
                        </div>
                        <div>
                            <label htmlFor="username">Enter username</label>
                            <div className="input input--icon input--fluid">
                                <input type="text" placeholder="Enter username" id="username" value = {username} onChange = { (e) => {setusername(e.target.value)} } />
                                <i className="fa fa-search"></i>
                            </div> 
                        </div>
                            <br/>
                        <div>
                            <label htmlFor="password">Enter password</label>
                            <div className="input input--icon input--fluid">
                                <input type="password" placeholder="Enter password" id="password" value = {password} onChange = { (e) => {setpassword(e.target.value)} } />
                                <i className="fa fa-search"></i>
                            </div> 
                        </div>
                        <br/>
                        <button className={`btn btn--primary ${styles.signin}`} >Signin</button>
                    </form>
                </div>         
        </div>
    )
}