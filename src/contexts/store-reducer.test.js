import { AddToPlayList, CreatePlayList, InitializePlaylists, RemoveFromPlayList } from '../actions';
import { initialState, reducer } from './store-reducer';

describe("Testing the playlists store", () => {
    
    test("Initialize Playlists", () => {
        const action = new InitializePlaylists([
            {
                videos: [],
                _id: 1,
                title: "first"
            }
        ]);
        const state = reducer(initialState, action);
        expect(state).toEqual({
            playlists: [
                {
                    videos: [],
                    _id: 1,
                    title: "first"
                }
            ]
        })

    });

    test("Create Playlist", () => {
        const action = new CreatePlayList({ 
            playlist: {
                title: "css",
                videos: [],
                _id: "p1" 
            },
            video: {
                title: "title1",
                description: "description1",
                thumbnailURL: "thumbnailURL",
                videoURL: "videoURL",
                author: "author",
                _id: "v1"
            }
         });

         const state = reducer(initialState, action);

         expect(state).toEqual({
            playlists: [
                {
                    videos: [
                        {
                            title: "title1",
                            description: "description1",
                            thumbnailURL: "thumbnailURL",
                            videoURL: "videoURL",
                            author: "author",
                            _id: "v1"
                        }
                    ],
                    _id: "p1",
                    title: "css"
                }
            ]
         })

    })

    test("Add to Playlist", () => {

        const state1 = {
            playlists: [
                {
                    videos: [],
                    _id: "p1",
                    title: "first"
                },
                {
                    videos: [],
                    _id: "p2",
                    title: "second"
                }
            ]
        }

        const action1 = new AddToPlayList({
            video: {
                title: "title1",
                description: "description1",
                thumbnailURL: "thumbnailURL",
                videoURL: "videoURL",
                author: "author",
                _id: "v1"
            },
            playlistId: "p1"
        });

        const state2 = reducer(state1, action1);

        const action2 = new AddToPlayList({
            video: {
                title: "title2",
                description: "description2",
                thumbnailURL: "thumbnailURL",
                videoURL: "videoURL",
                author: "author",
                _id: "v2"
            },
            playlistId: "p1"
        });

        const state3 = reducer(state2, action2);


        expect(state3).toEqual({
            playlists: [
                {
                    videos: [
                        {
                            title: "title1",
                            description: "description1",
                            thumbnailURL: "thumbnailURL",
                            videoURL: "videoURL",
                            author: "author",
                            _id: "v1"
                        },
                        {
                            title: "title2",
                            description: "description2",
                            thumbnailURL: "thumbnailURL",
                            videoURL: "videoURL",
                            author: "author",
                            _id: "v2"
                        }
                    ],
                    _id: "p1",
                    title: "first"
                },
                {
                    videos: [],
                    _id: "p2",
                    title: "second"
                }
            ]
        })

    });

    test("Remove from playlist", () => {
        const state1 = {
            playlists: [
                {
                    videos: [
                        {
                            title: "title1",
                            description: "description1",
                            thumbnailURL: "thumbnailURL",
                            videoURL: "videoURL",
                            author: "author",
                            _id: "v1"
                        },
                        {
                            title: "title2",
                            description: "description2",
                            thumbnailURL: "thumbnailURL",
                            videoURL: "videoURL",
                            author: "author",
                            _id: "v2"
                        }
                    ],
                    _id: "p1",
                    title: "first"
                },
                {
                    videos: [],
                    _id: "p2",
                    title: "second"
                }
            ]
        };

        const action = new RemoveFromPlayList({
            playlistId: "p1",
            videoId: "v1"
        })

        const state2 = reducer(state1, action);

        expect(state2).toEqual({
            playlists: [
                {
                    videos: [
                        {
                            title: "title2",
                            description: "description2",
                            thumbnailURL: "thumbnailURL",
                            videoURL: "videoURL",
                            author: "author",
                            _id: "v2"
                        }
                    ],
                    _id: "p1",
                    title: "first"
                }
            ]
        })

    })

});