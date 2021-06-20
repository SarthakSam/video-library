import styles from './Comments.module.css';
import { Comment } from './comment/Comment';
import { NewComment } from './new-comment/NewComment'
import { useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { UseAxios } from '../../custom-hooks/useAxios';
import { getUrl } from '../../api.config';
import { useNotifications } from '../../contexts/notifications-context';
import { useVideo } from '../../contexts/video-context';
import { AddCommentToVideo, AddReplyOnComment } from '../../actions';

export function Comments() {

    const [ newCommentBoxVisible, setNewCommentBoxVisible ] = useState(false);
    const { user } = useAuth();
    const apiCall = UseAxios();
    const { showNotification } = useNotifications();
    const { dispatch, state: { video: { _id: videoId, comments } } } = useVideo();

    const showCommentBox = () => {
        setNewCommentBoxVisible(true)
    }

    const onCancel = () => {
        setNewCommentBoxVisible(false);
    }

    const postComment = (comment) => {
        const config = {
            headers: {
                authtoken: user._id
            }
        }
        const body = { comment };
        const url = getUrl('comment', { id: videoId });
        apiCall('post', (res) => {
            dispatch( new AddCommentToVideo(res.data.comment) );
            showNotification( { type: 'SUCCESS', message: 'Comment posted successfully' } );
            setNewCommentBoxVisible(false);
        }, (err) => {
            showNotification({ type: 'ERROR', message: err.error })
        }, url, body, config)
    }

    const postReply = (comment, commentId) => {
        const config = {
            headers: {
                authtoken: user._id
            }
        }
        const body = { comment };
        const url = getUrl('reply', { id: videoId, commentId });
        apiCall('post', (res) => {
            dispatch( new AddReplyOnComment({ reply: res.data.comment, commentId }) );
            showNotification( { type: 'SUCCESS', message: 'Comment posted successfully' } );
        }, (err) => {
            showNotification({ type: 'ERROR', message: err.error })
        }, url, body, config)
    }

    return (
        <div className={`row ${styles.comments__container}`}>
            {
                user && !newCommentBoxVisible && <div className={`row col-12 ${styles.commentButton}`}>
                            <button className="btn btn--secondary btn--inverted" onClick = { showCommentBox } >Comment</button>
                        </div>

            }
            <NewComment visible = { newCommentBoxVisible } onCancel = { onCancel }  onSubmit = { postComment } />
            <h2 className="h4 col-12 p-0">Comments</h2>
            {
                comments?.length? <ul className={`col-12 p-0 ${styles.comments}`}> {
                    comments.map( comment => (
                            <>
                                <li key = {comment._id} className={`${styles.comment}`} ><Comment {...comment} canBeReplied postReply = { postReply } /></li>
                                {
                                    comment.comments && <ul> {
                                            comment.comments.map(subComment => <li key = { subComment._id } className={`${styles.comment}`}><Comment {...subComment} /></li>)                                     
                                    }
                                    </ul>
                                }
                            </>    
                        ))
                }
                </ul> : <p className="text--lead col-12">No comments yet. Be the first one to comment</p>
    
            }
        </div>
    )
}