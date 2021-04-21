import { actions } from '../actions';

export const initialState = {
    video: null
}

export function reducer(state, action) {
    switch( action.type ) {
        case actions.INITIALIZE_VIDEOS: return { video: action.payload };
        case actions.SET_LIKE_AND_DISLIKES: return { ...state, video: { ...state.video, likedBy: action.payload.likedBy, dislikedBy: action.payload.dislikedBy } };
        case actions.ADD_COMMENT_ON_VIDEO: return { ...state, video: { ...state.video, comments: [...state.video.comments, action.payload] }};
        case actions.ADD_REPLY_ON_COMMENT: return addReplyToComment(state, action);
        default: return state;
    }
}

function addReplyToComment(state, action) {
    const comments = state.video.comments.map( comment => {
        if(comment._id === action.payload.commentId) {
            comment.comments = [...comment.comments, action.payload.reply];
        }
        return comment;
    });
    return { ...state, video: { ...state.video, comments } };

}