
export const staticRoutes = [
    { id: 'home', title: 'Home', icon: 'FaHome',  goTo: { path: 'home', params: ''} },
    { id: 'history', title: 'History', icon: 'MdHistory', goTo: { path: 'history', params: ''} },
    { id: 'uploadNew', title: 'Upload video', icon: 'FaCloudUploadAlt', goTo: { path: 'uploads/new', params: ''} },
    { id: 'uploads', title: 'Your videos', icon: 'FaFileVideo', goTo: { path: 'uploads', params: ''} },
    { id: 'liked', title: 'Liked videos', icon: 'FaThumbsUp', goTo: { path: 'playlist', params: 'liked'} },
    { id: 'disliked', title: 'Disliked videos', icon: 'FaThumbsDown', goTo: { path: 'playlist', params: 'disliked'} }
]

export const watchLaterObj = { id: 'watch_later', title: 'Watch Later', items: [] };
        