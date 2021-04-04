export const actions = {
    INITIALIZE_VIDEOS: 'INITIALIZE_VIDEOS_DATA',
    INITIALIZE_PLAYLISTS: 'INITIALIZE_PLAYLISTS',
    CREATE_PLAYLIST: 'CREATE_PLAYLIST',
    ADD_TO_PLAYLIST: 'ADD_TO_PLAYLIST',
    REMOVE_FROM_PLAYLIST: 'REMOVE_FROM_PLAYLIST',
    CHANGE_ROUTE: 'CHANGE_ROUTE',
    UPLOAD_VIDEO: 'UPLOAD_VIDEO',
    EDIT_FIELD: 'EDIT_FIELD',
    RESET_FORM: 'RESET_FORM',
    ADD_TO_HISTORY: 'ADD_TO_HISTORY',
    REMOVE_FROM_HISTORY: 'REMOVE_FROM_HISTORY'
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

export class AddToHistory {
    constructor(payload) {
        this.type = actions.ADD_TO_HISTORY;
        this.payload = payload;
    }
}
export class RemoveFromHistory {
    constructor(payload) {
        this.type = actions.REMOVE_FROM_HISTORY;
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

export class EditField {
    constructor(payload) {
        this.type = actions.EDIT_FIELD;
        this.payload = payload;
    }
}

export class UploadVideo {
    constructor(payload) {
        this.type = actions.UPLOAD_VIDEO;
        this.payload = payload;
    }
}