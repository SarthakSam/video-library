export const actions = {
    INITIALIZE_VIDEOS_DATA: 'INITIALIZE_VIDEOS_DATA',
    CREATE_PLAYLIST: 'CREATE_PLAYLIST',
    ADD_TO_PLAYLIST: 'ADD_TO_PLAYLIST'
}

export class InitializeVideoListing {
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