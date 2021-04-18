import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../contexts/auth-context";
import { useNotifications } from "../contexts/notifications-context";
import { mapping } from '../api.config';

import { UseAxios } from "../custom-hooks/useAxios";
import { PlaylistItem } from '../playlist-item/PlaylistItem';

export function Library() {
    const { id: apiEndPoint } = useParams();
    const [ playlist, setPlaylist ] = useState(null);
    const { user } = useAuth();
    const apiCall = UseAxios();
    const { showNotification } = useNotifications();

    useEffect( () => {
        console.log(apiEndPoint);
        const config = { headers: { authtoken: user._id } };
        apiCall('get', (res) => {
            setPlaylist( res.data );
        }, (err) => {
            showNotification({ type: 'ERROR', message: 'Something went wrong'});
        }, mapping[apiEndPoint] ,config);
    }, [apiEndPoint] );

    return (
        <>
            <h2> { apiEndPoint } </h2>
            <br/>
            <ul className="row " style={{ listStyle: 'none' }}>
                { 
                    playlist && playlist.videos.length ? playlist.videos.map( video => <li  key = { video._id } className="col-4 col-lg-4 col-md-6 col-sm-12 p-0">
                            <PlaylistItem video = { video } />
                    </li>) : <h4>Nothing to show Here</h4>
                }
            </ul>
        </>
    )
}