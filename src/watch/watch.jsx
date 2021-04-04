import { useEffect, useState } from "react";
import { YoutubePlayer } from "reactjs-media";
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { MdPlaylistPlay } from 'react-icons/md'

import { useLoader } from "../loader-context";
import { useStore } from "../store-context";
import { PlaylistItem } from '../playlist-item/PlaylistItem';

import styles from './watch.module.css';

export function Watch({ id }) {
    const { state: { videos } } = useStore();
    const [video, setVideo] = useState(null);
    const { setLoading } = useLoader()

    useEffect( () => {
        setLoading(true);
        const selectedVideo = videos.find(video => video.id === id);
        setVideo( selectedVideo );
        setLoading(false);
    }, [id]);

    return (
        <>
            {
                video && <div className={"row " + styles.watch}>
                            <div className={"card col-9 col-lg-12 col-md-12 col-sm-12 " + styles.video__container }>
                                <YoutubePlayer src={ video.videoURL } allowFullScreen width="100%" height="100%"/>
                                <div className={styles.card__body }>
                                    <p className="card__title">{ video.title }</p>
                                    <div className="row spaceBetween">
                                        <ul className={styles.watch__list}>
                                            <li className={ "card__meta " + styles.watch__list__item }>{ video.views } views</li>
                                            <li className={ "card__meta " + styles.watch__list__item }>{ video.uploadedDate }</li>
                                        </ul>
                                        <ul className={styles.watch__list }>
                                            <li className={ styles.watch__list__item + " " + styles.button }>
                                                <FaThumbsUp />
                                                <span>{ video.likes }</span>
                                            </li>
                                            <li className={ styles.watch__list__item + " " + styles.button }>
                                                <FaThumbsDown />
                                                <span>{ video.dislikes }</span>
                                            </li>
                                            <li className={ styles.watch__list__item + " " + styles.button }>
                                                <MdPlaylistPlay />
                                            </li>
                                        </ul>

                                    </div>
                                    <hr/>
                                    <p className="card__description">{ video.description }</p>
                                    {/* <hr/> */}

                                </div>
                            </div>
                            <ul className="row col-3 col-lg-12 col-md-12 col-sm-12 p-0 m-0 " style={{ listStyle: 'none' }}>
                               { 
                                    videos.map( video => <li  key = { video.id } className="col-12 col-lg-4 col-md-6 col-sm-12 p-0">
                                         <PlaylistItem video = { video } />
                                    </li>)
                               }
                            </ul>
                        </div>
            }
        </>
    )
}

                