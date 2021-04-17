import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useAuth } from '../contexts/auth-context';
import styles from './Signin.module.css';
import { UseAxios } from '../custom-hooks/useAxios';
import { mapping } from '../api.config';
import { useNotifications } from '../contexts/notifications-context';

export function Signin() {
    const { setUser } = useAuth();
    const {state } = useLocation();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const apiCall = UseAxios();
    const {showNotification} = useNotifications();

    const signin = () => {
        apiCall('post', (res) => {
            setUser(res.data.user);
            navigate(state?.from? state.from : '/home' );
            showNotification({ type: 'SUCCESS', message: res.data.message});
        }, (err) => {
            showNotification({ type: 'ERROR', message: err.message});
        }, mapping['signin'], { username, password }, null)
    }

    return (
        <div className={`row ${styles.form__container}`}>
                <form className={`col-6 col-lg-8 col-md-10 col-sm-12 ${styles.form}`}>
                    <div className={`${styles.title}`}>
                        <h3 className="h3">Streamit</h3>
                        <br/>
                        <h4 className="h4">Sign in</h4>
                        <br/>
                    </div>
                    <div>
                        <label htmlFor="username">Enter username</label>
                        <div class="input input--icon input--fluid">
                            <input type="text" placeholder="Enter text" id="username" value = {username} onChange = { (e) => {setusername(e.target.value)} } />
                            <i class="fa fa-search"></i>
                        </div> 
                    </div>
                        <br/>
                    <div>
                        <label htmlFor="password">Enter password</label>
                        <div class="input input--icon input--fluid">
                            <input type="password" placeholder="Enter text" id="password" value = {password} onChange = { (e) => {setpassword(e.target.value)} } />
                            <i class="fa fa-search"></i>
                        </div> 
                    </div>
                    <br/>
                    <button type="button" className={`btn btn--primary ${styles.signin}`} onClick = {signin}>Signin</button>
                </form>
        </div>
    )
}