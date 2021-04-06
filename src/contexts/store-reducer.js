import { actions, LikeDislikeVideo } from '../actions';
import { watchLaterObj } from '../static-data';

export const initialState = {
    videos: [],
    playlists: [],
    history: { title: 'History', items: []},
    uploads: { title: 'Uploaded Videos', items: []},
    liked: { title: 'Liked Videos', items: []},
    disliked: { title: 'Disliked Videos', items: []},
    user: 'user1'
}

export function reducer(state, action) {
    switch( action.type ) {
        case actions.INITIALIZE_VIDEOS:      return { ...state, videos: [...action.payload] };
        case action.INITIALIZE_PLAYLISTS:    return { ...state, playlists: [watchLaterObj, ...action.payload] };
        case actions.CREATE_PLAYLIST:        return createPlayList(state, action);
        case actions.ADD_TO_PLAYLIST:        return addToPlayList(state, action);
        case actions.REMOVE_FROM_PLAYLIST:   return removeFromPlayList(state, action);
        case actions.UPLOAD_VIDEO:           return { ...state, videos: [...state.videos, action.payload]};
        case actions.ADD_TO_HISTORY:         return { ...state, history: {...state.history, items: [ ...state.history.items, action.payload] } };
        case actions.LIKE_DISLIKE_VIDEO:     return likeDislikeVideo(state, action);
        // case actions.REMOVE_FROM_HISTORY:    return removeFromHistory(state, action);
        default:                             return state;
    }
}

function createPlayList(state, action) {
    return { ...state, playlists: [...state.playlists, { ...action.payload.playlist, items: [ action.payload.video ] }] }
}

function addToPlayList(state, action) {
    let changedPlaylist = state.playlists.map( playlist => {
        if(playlist.id === action.payload.playlistId) {
            return { ...playlist, items: [...playlist.items, action.payload.video]};
        }
        return playlist;
    })
    return { ...state, playlists: changedPlaylist }
}

function removeFromPlayList(state, action) {
    let changedPlaylist = state.playlists.map( playlist => {
        if(playlist.id === action.payload.playlistId) {
            return { ...playlist, items: playlist.items.filter( item => item.id !== action.payload.video.id ) };
        }
        return playlist;
    })
    changedPlaylist = changedPlaylist.reduce((acc, cur) => { 
        if(cur.items.length > 0 || cur.id === watchLaterObj.id)
           acc.push(cur); 
        return acc;
    } , []);
    return { ...state, playlists: changedPlaylist }
}

function likeDislikeVideo(state, action) {
    const likedVideos = state.liked.items.filter( video => video.id !== action.payload.video.id );
    const dislikedVideos = state.disliked.items.filter( video => video.id !== action.payload.video.id );
    if( action.payload.isLiked ) {
        likedVideos.push(action.payload.video);
    }
    if(action.payload.isDisliked) {
        dislikedVideos.push(action.payload.video);
    }
    return { ...state, liked: { ...state.liked, items: likedVideos } , disliked: { ...state.disliked, items: dislikedVideos } };
}

// function removeFromHistory(state, action) {
//     return { ...state, history: state.history.filter( video => video.id !== action.payload.id )};
// }