export const staticRoutes = [
    { id: 'home', title: 'Home', goTo: { path: 'home', params: ''} },
    { id: 'history', title: 'History', goTo: { path: 'history', params: ''} },
    { id: 'uploads', title: 'Your videos', goTo: { path: 'uploads', params: ''} },
    { id: 'liked', title: 'Liked videos', goTo: { path: 'playlist', params: 'liked'} },
    { id: 'disliked', title: 'Disliked videos', goTo: { path: 'playlist', params: 'disliked'} }
]

export const watchLaterObj = { id: 'watch_later', title: 'Watch Later', items: [] };
        