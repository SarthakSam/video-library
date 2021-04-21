export const mapping = {
    getVideos: '/videos',
    postVideo: '/videos',
    getPlaylists: '/playlists',
    postPlaylist: '/playlists',
    updatePlaylist: '/playlists',
    signin: '/signin',
    signup: '/signup',
    uploads: '/uploads',
    liked: '/videos/liked',
    disliked: '/videos/disliked',
    likeDislikeVideo: '/likeDislike',
    comment: '/videos/:id/comments',
    reply: '/videos/:id/comments/:commentId/comments'
}

export const getUrl = (url, params) => {
    return Object.keys(params).reduce( (newUrl, param) => {
        newUrl = newUrl.replace(`:${param}`, String(params[param]));
        return newUrl;
    }, mapping[url] );
}

// const baseURL = 'localhost:3001';

// export const getURL = (requestName) => {
//     return baseURL + mapping[requestName];
// }