import styles from './Loader.module.css';

export function Loader({ loading }) {
    return (
        <>
            {
                loading && 
                <div class={ styles.spinner__container }>
                    <div class={ styles.spinner + " spinner-2"}></div>
                </div>
            }
        </>
    )
}