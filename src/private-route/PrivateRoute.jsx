import { Route, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../contexts/auth-context';

export function PrivateRoute({ path, ...rest}) {
    const { user } = useAuth();
    const state = { from: path };

    if(user)
        return <Route path = {path} {...rest} /> 
    return <Navigate state = { state } to = '/login' replace />
}