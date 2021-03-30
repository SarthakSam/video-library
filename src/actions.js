export const actions = {
    INITIALIZE_VIDEOS_DATA: 'INITIALIZE_VIDEOS_DATA'
}

export class InitializeVideoListing {
    constructor(payload) {
        this.type = actions.INITIALIZE_VIDEOS_DATA;
        this.payload = payload;
    }
}