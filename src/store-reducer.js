import { actions } from './actions';


export const initialState = {
    videos: [],
    playlists: [
        { id: 1, title: 'Watch Later', items: [] },
        { id: 2, title: 'Liked', items: [] },
        { id: 3, title: 'DisLiked', items: [] }
    ],
    history: [],
}

export function reducer(state, action) {
    switch( action.type ) {
        case actions.INITIALIZE_VIDEOS_DATA: return { ...state, videos: [...action.payload] };
        case actions.CREATE_PLAYLIST:        return createPlayList(state, action);
        case actions.ADD_TO_PLAYLIST:        return addToPlayList(state, action);
        case actions.REMOVE_FROM_PLAYLIST:   return removeFromPlayList(state, action);
        default:                             return state;
    }
}

function createPlayList(state, action) {
    return { ...state, playlists: [...state.playlists, { id: (new Date()).toISOString(), title: action.payload.title, items: [ action.payload.video ] }] }
}

function addToPlayList(state, action) {
    let changedPlaylist = state.playlists.map( playlist => {
        if(playlist.id === action.payload.playListId) {
            return { ...playlist, items: [...playlist.items, action.payload.video]};
        }
        return playlist;
    })
    return { ...state, playlists: changedPlaylist }
}

function removeFromPlayList(state, action) {
    let changedPlaylist = state.playlists.map( playlist => {
        if(playlist.id === action.payload.playListId) {
            return { ...playlist, items: playlist.items.filter( item => item.id !== action.payload.video.id ) };
        }
        return playlist;
    })
    changedPlaylist = changedPlaylist.reduce((acc, cur) => { 
        if(cur.items.length > 0 || cur.id < 4)
           acc.push(cur); 
        return acc;
    } , []);
    return { ...state, playlists: changedPlaylist }
}