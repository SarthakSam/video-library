import { useEffect } from 'react';
import { formatDate } from '../../../utils';
import styles from './Comment.module.css';

export function Comment({ content, author, createdAt }) {

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
                { content }
            </div>
        </div>
    )
}