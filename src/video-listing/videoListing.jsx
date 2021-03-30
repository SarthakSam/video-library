import { useStore } from '../store-context';
import { Video } from './video/Video';

export function VideoListing() {
    const { state: { videos } } = useStore();
    return (
        <ul className="row">
            {
                videos.map( video => <Video key = { video.id } video = { video } />)
            }
        </ul>
    )
}