import { YoutubePlayer } from "reactjs-media";

import styles from './video.module.css';

export function Video() {
    return (
        <div>
           <YoutubePlayer
                src="https://www.youtube.com/watch?v=TQQPAU21ZUw"
                allowFullScreen
                width='100%'
                height='100%'
                // other props
            />
        </div>
    )
}