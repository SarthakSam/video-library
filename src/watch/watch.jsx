import { YoutubePlayer } from "reactjs-media";

import styles from './watch.module.css';

export function Watch({ id }) {
    console.log(id);
    return (
        <div>
           <YoutubePlayer
                src="https://www.youtube.com/watch?v=TQQPAU21ZUw"
                allowFullScreen
                // other props
            />
        </div>
    )
}