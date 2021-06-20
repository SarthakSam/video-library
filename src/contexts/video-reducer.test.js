import { AddCommentToVideo, AddReplyOnComment, InitializeVideo, SetLikesAndDislikes } from "../actions";
import { reducer, initialState } from './video-reducer';

describe("Testing the video store", () => {
    test("Initialize the video", () => {
        const action = new InitializeVideo({
            _id: "video1Id",
            title: "video 1",
            description: "video 1",
            thumbnailURL: "thumbnailURL1",
            videoURL: "videoURL1",
            author: "user1",
            likedBy: [],
            dislikedBy: []
        });

        const finalState = reducer(initialState, action);

        expect(finalState).toEqual( {
            video: {
                _id: "video1Id",
                title: "video 1",
                description: "video 1",
                thumbnailURL: "thumbnailURL1",
                videoURL: "videoURL1",
                author: "user1",
                likedBy: [],
                dislikedBy: []
            }
        })

    });

    test("Like dislike a video", () => {
        const initialState = {
            video: {
                _id: "video1Id",
                title: "video 1",
                description: "video 1",
                thumbnailURL: "thumbnailURL1",
                videoURL: "videoURL1",
                author: "user1",
                likedBy: ["user1Id", "user2Id"],
                dislikedBy: []
            }
        };

        const action = new SetLikesAndDislikes({
            _id: "video1Id",
            title: "video 1",
            description: "video 1",
            thumbnailURL: "thumbnailURL1",
            videoURL: "videoURL1",
            author: "user1",
            likedBy: ["user1Id"],
            dislikedBy: ["user2Id"]
        });

        const finalState = reducer(initialState, action);

        const video = {
            _id: "video1Id",
            title: "video 1",
            description: "video 1",
            thumbnailURL: "thumbnailURL1",
            videoURL: "videoURL1",
            author: "user1",
            likedBy: ["user1Id"],
            dislikedBy: ["user2Id"]
        }

        expect(finalState).toEqual({
            video
        });

    });

    test("Commenting on a video", () => {

        const initialState = {
            video: {
                _id: "video1",
                author: {_id: "user1Id", username: "user1"},
                comments: [],
                content: "I never thought doing programming will give me this much joy",    
            }
        }

        const action = new AddCommentToVideo({
            comments: [],
            content: "Great Video",
            _id: "comment1"
        });

        const finalState = reducer(initialState, action);

        expect(finalState).toEqual({
            video: {
                _id: "video1",
                author: {_id: "user1Id", username: "user1"},
                comments: [
                    {
                        comments: [],
                        content: "Great Video",
                        _id: "comment1"
                    }
                ],
                content: "I never thought doing programming will give me this much joy"
            }
        });
    });

    test("Reply to a comment", () => {
        const initialState = {
            video: {
                _id: "video1",
                author: {_id: "user1Id", username: "user1"},
                comments: [
                    {
                        comments: [],
                        content: "Great Video",
                        _id: "comment1"
                    }
                ],
                content: "I never thought doing programming will give me this much joy"
            }
        };

        const action = new AddReplyOnComment({
            reply: {
                comments: [],
                content: "True that",
                _id: "comment2"
            },
            commentId: "comment1"
        });

        const finalState = reducer(initialState, action);

        expect(finalState).toEqual({
            video: {
                _id: "video1",
                author: {_id: "user1Id", username: "user1"},
                comments: [
                    {
                        comments: [
                            {
                                comments: [],
                                content: "True that",
                                _id: "comment2"
                            }
                        ],
                        content: "Great Video",
                        _id: "comment1"
                    }
                ],
                content: "I never thought doing programming will give me this much joy"
            }
        })

    });

});