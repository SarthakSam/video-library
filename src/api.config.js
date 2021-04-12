const mapping = {
    getVideos: '/videos',
    postVideos: '/videos',
    getPlaylists: '/playlists',
    postPlaylist: '/playlists',
}

const baseURL = 'localhost:3001';

export const getURL = (requestName) => {
    return baseURL + mapping[requestName];
}