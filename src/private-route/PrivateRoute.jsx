import { Route, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../contexts/auth-context';

export function PrivateRoute({ ...rest}) {
    const { user } = useAuth();
    const location = useLocation();
    const state = { from: location.pathname };

    if(user)
        return <Route {...rest} /> 
    return <Navigate state = { state } to = '/signin' replace />
}