import styles from './ConfirmationDialog.module.css';

const popupSizes = {
    small: 'popup--small',
    medium: 'popup--medium',
    large: 'popup--large'
}

export function ConfirmationDialog({ title, children, onSubmit, onCancel, size = 'medium'   }) {
    return (
        <div className={ `${ styles.popup__container } popup__container ${ popupSizes[size] }` }>
        <div className="popup">
            <div className="popup__header">
                <h3 className="popup__title">{ title }</h3>   
            </div>
            <div className="popup__body">
               {children}
            </div>
            <div className={`popup__footer ${ styles.popupFooter } `}>
                <div className="popup__footer__buttons">
                    <button className="btn btn--secondary popup__close" onClick = { onCancel }>cancel</button>
                    <button className="btn btn--primary"  onClick = { onSubmit }>submit</button>
                </div>
            </div>
        </div>
    </div>
    )
}