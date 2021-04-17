import { actions } from '../actions';

export const initialState = {
    videos: [],
    playlists: [],
    // history: { title: 'History', videos: []},
    // uploads: { title: 'Uploaded Videos', videos: []},
    // liked: { title: 'Liked Videos', videos: []},
    // disliked: { title: 'Disliked Videos', videos: []},
}

export function reducer(state, action) {
    switch( action.type ) {
        case actions.INITIALIZE_VIDEOS:      return { ...state, videos: [...action.payload] };
        case action.INITIALIZE_PLAYLISTS:    return { ...state, playlists: [...action.payload] };
        case actions.CREATE_PLAYLIST:        return createPlayList(state, action);
        case actions.ADD_TO_PLAYLIST:        return addToPlayList(state, action);
        case actions.REMOVE_FROM_PLAYLIST:   return removeFromPlayList(state, action);
        case actions.UPLOAD_VIDEO:           return { ...state, videos: [...state.videos, action.payload]};
        case actions.ADD_TO_HISTORY:         return { ...state, history: {...state.history, videos: [ ...state.history.videos, action.payload] } };
        case actions.LIKE_DISLIKE_VIDEO:     return likeDislikeVideo(state, action);
        // case actions.REMOVE_FROM_HISTORY:    return removeFromHistory(state, action);
        default:                             return state;
    }
}

function createPlayList(state, action) {
    return { ...state, playlists: [...state.playlists, { ...action.payload.playlist, videos: [ action.payload.video ] }] }
}

function addToPlayList(state, action) {
    let changedPlaylist = state.playlists.map( playlist => {
        if(playlist._id === action.payload.playlistId) {
            return { ...playlist, videos: [...playlist.videos, action.payload.video]};
        }
        return playlist;
    })
    return { ...state, playlists: changedPlaylist }
}

function removeFromPlayList(state, action) {
    let changedPlaylist = state.playlists.map( playlist => {
        if(playlist._id === action.payload.playlistId) {
            return { ...playlist, videos: playlist.videos.filter( item => item._id !== action.payload.video._id ) };
        }
        return playlist;
    })
    changedPlaylist = changedPlaylist.reduce((acc, cur) => { 
        if(cur.videos.length > 0 || cur.isPermanent)
           acc.push(cur); 
        return acc;
    } , []);
    return { ...state, playlists: changedPlaylist }
}

function likeDislikeVideo(state, action) {
    const likedVideos = state.liked.videos.filter( video => video._id !== action.payload.video._id );
    const dislikedVideos = state.disliked.videos.filter( video => video._id !== action.payload.video._id );
    if( action.payload.isLiked ) {
        likedVideos.push(action.payload.video);
    }
    if(action.payload.isDisliked) {
        dislikedVideos.push(action.payload.video);
    }
    return { ...state, liked: { ...state.liked, videos: likedVideos } , disliked: { ...state.disliked, videos: dislikedVideos } };
}

// function removeFromHistory(state, action) {
//     return { ...state, history: state.history.filter( video => video._id !== action.payload._id )};
// }