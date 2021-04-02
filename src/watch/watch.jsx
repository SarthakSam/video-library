import { useEffect, useState } from "react";
import { YoutubePlayer } from "reactjs-media";
import { useStore } from "../store-context";

import styles from './watch.module.css';

export function Watch({ id }) {
    const { state: { videos } } = useStore();
    const [video, setVideo] = useState(null);

    useEffect( () => {
        const selectedVideo = videos.find(video => video.id === id);
        setVideo( selectedVideo );
    }, []);

    return (
        <>
            {
                video? 
                    <div className="row">
                        <div className={"col-12 " + styles.video__container }>
                            <YoutubePlayer src={ video.videoUrl } allowFullScreen width="100%" height="100%"/> :
                        </div>
                    </div>
                    :
                    <p>Showing loading</p>
            }
        </>
    )
}

                