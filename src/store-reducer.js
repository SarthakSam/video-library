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
        case actions.INITIALIZE_VIDEOS_DATA: 
                                            return { ...state, videos: [...action.payload] };
        case actions.CREATE_PLAYLIST: 
                                    return { ...state, playlists: [...state.playlists, { id: (new Date()).toISOString(), title: action.payload.title, items: [ ...action.payload.video ] }] }
        case actions.ADD_TO_PLAYLIST: 
                                        let changedPlaylist = state.playlists.map( playlist => {
                                            if(playlist.id === action.payload.playListId) {
                                                return { ...playlist, items: [...playlist.items, action.payload.video]};
                                            }
                                            return playlist;
                                        })
                                    return { ...state, playlists: changedPlaylist }
        default: 
                return state;
    }
}
