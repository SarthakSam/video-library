export const actions = {
    INITIALIZE_VIDEOS: 'INITIALIZE_VIDEOS_DATA',
    INITIALIZE_PLAYLISTS: 'INITIALIZE_PLAYLISTS',
    CREATE_PLAYLIST: 'CREATE_PLAYLIST',
    ADD_TO_PLAYLIST: 'ADD_TO_PLAYLIST',
    REMOVE_FROM_PLAYLIST: 'REMOVE_FROM_PLAYLIST',
    UPLOAD_VIDEO: 'UPLOAD_VIDEO',
    ADD_TO_HISTORY: 'ADD_TO_HISTORY',
    REMOVE_FROM_HISTORY: 'REMOVE_FROM_HISTORY',
    LIKE_DISLIKE_VIDEO: 'LIKE_DISLIKE_VIDEO',
    UNLIKE_UNDISLIKE_VIDEO: 'UNLIKE_UNDISLIKE_VIDEO',
    INITIALIZE_VIDEO: 'INITIALIZE_VIDEO',
    SET_LIKE_AND_DISLIKES: 'SET_LIKE_AND_DISLIKES',
    ADD_COMMENT_ON_VIDEO: 'ADD_COMMENT_ON_VIDEO',
    ADD_REPLY_ON_COMMENT: 'ADD_REPLY_ON_COMMENT'
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
export class InitializeVideo {
    constructor(payload) {
        this.type = actions.INITIALIZE_VIDEOS;
        this.payload = payload;
    }
}

export class SetLikesAndDislikes {
    constructor(payload) {
        this.type = actions.SET_LIKE_AND_DISLIKES;
        this.payload = payload;
    }
}

export class AddCommentToVideo {
    constructor(payload) {
        this.type = actions.ADD_COMMENT_ON_VIDEO;
        this.payload = payload;
    }
}

export class AddReplyOnComment {
    constructor(payload) {
        this.type = actions.ADD_REPLY_ON_COMMENT;
        this.payload = payload;
    }
}