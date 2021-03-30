import { actions } from './actions';


export const initialState = {
    videos: []
}

export function reducer(state, action) {
    switch( action.type ) {
        case actions.INITIALIZE_VIDEOS_DATA: 
                                            return { ...state, videos: [...action.payload] };
        default: 
                return state;
    }
}
