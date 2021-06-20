import { useState } from 'react';
import styles from './Comment.module.css';
import { NewComment } from '../new-comment/NewComment';
import { useAuth } from '../../../contexts/auth-context';

export function Comment({ content, author, createdAt, canBeReplied, _id: commentId, postReply }) {
    const [ newCommentBoxVisible, setNewCommentBoxVisible ] = useState(false);
    const { user } = useAuth();

    const onCancel = () => {
        setNewCommentBoxVisible(false);
    }

    const onSubmit = (comment) => {
        postReply(comment, commentId);
        setNewCommentBoxVisible(false);
    }

    return (
            <div className={`${styles.comment}`}>
                <div className={`avatar avatar--round ${styles.avatar}`}>
                    <img src="/avatar.png" alt="" className="avatar__img"/>
                </div>
                <div className={`${styles.comment__header}`}>
                    <strong className={styles.comment__author}>{ author.username }</strong>
                    <span className={styles.comment__date}> { createdAt } </span>
                </div>
                <div className={`${styles.comment__body}`}>
                    <p>{ content }</p>
                    {
                        canBeReplied && user && !newCommentBoxVisible && <span className={styles.reply__btn} onClick = { () => { setNewCommentBoxVisible(true) } } >Reply</span>
                    }
                    <NewComment visible = { newCommentBoxVisible } onCancel = { onCancel }  onSubmit = { onSubmit } />
                </div>
            </div>
    )
}