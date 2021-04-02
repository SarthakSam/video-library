import { RemoveFromPlayList } from '../../actions';

export function PlaylistItem({ video, removeFromPlayList }) {
    return (
        <li className={ "col-4 col-lg-6 col-md-6 col-sm-12 card card--horizontal" }>
                <div class="card__img col-6 p-0 m-0">
                    <img src={video.thumbnailURL} alt="" />
                </div>
                <div class="card__content">
                    <p class="card__title">{video.title}</p>
                    <p class="card__meta">{ video.author }</p>
                    <button class="btn btn--danger btn--inverted btn--fluid" onClick = { () => { removeFromPlayList(video) } }>
                        <i class="fa fa-plus"></i>
                        Remove from playlist
                    </button>
                </div>
        </li>
    )
}