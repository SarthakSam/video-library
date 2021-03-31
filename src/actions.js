export const actions = {
    INITIALIZE_VIDEOS: 'INITIALIZE_VIDEOS_DATA',
    INITIALIZE_PLAYLISTS: 'INITIALIZE_PLAYLISTS',
    CREATE_PLAYLIST: 'CREATE_PLAYLIST',
    ADD_TO_PLAYLIST: 'ADD_TO_PLAYLIST',
    REMOVE_FROM_PLAYLIST: 'REMOVE_FROM_PLAYLIST',
    CHANGE_ROUTE: 'CHANGE_ROUTE'
}

export class InitializeVideoListing {
    constructor(payload) {
        this.type = actions.INITIALIZE_VIDEOS;
        this.payload = payload;
    }
}

export class InitializePlaylists {
    constructor(payload) {
        this.type = actions.INITIALIZE_VIDEOS_DATA;
        this.payload = payload;
    }
}


export class CreatePlayList {
    constructor(payload) {
        this.type = actions.CREATE_PLAYLIST;
        this.payload = payload;
    }
}

export class AddToPlayList {
    constructor(payload) {
        this.type = actions.ADD_TO_PLAYLIST;
        this.payload = payload;
    }
}

export class RemoveFromPlayList {
    constructor(payload) {
        this.type = actions.REMOVE_FROM_PLAYLIST;
        this.payload = payload;
    }
}

export class ChangeRoute {
    constructor(payload) {
        this.type = actions.CHANGE_ROUTE;
        this.payload = payload;
    }
}