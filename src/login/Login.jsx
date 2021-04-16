import { useAuth } from '../contexts/auth-context';
import { useLocation, useNavigate } from 'react-router-dom';


export function Login() {
    const { setUser } = useAuth();
    const {state } = useLocation();
    const navigate = useNavigate();

    const login = () => {
        setUser( val => !val);
        navigate(state?.from? state.from : '/home' );
    }

    return (
        <div>
            <p>Login Page</p>
            <button onClick= { login }>Login</button>
        </div>
    )
}