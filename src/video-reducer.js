import { actions } from './actions';

export const initialState = {
        thumbnailURL: '',
        videoURL: '',
        title: '',
        description: '',
        author: '',
        views: '',
        likes: '',
        dislike: '',
        uploadedDate: '',
        comments: [],
        duration: '',
        type: 'YOUTUBE'
}

export function reducer(state, action) {
    switch( action.type ) {
        case actions.EDIT_FIELD: return { ...state, [action.payload.field]: action.payload.value }

        default: return state;
    }
}