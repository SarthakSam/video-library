import styles from './menu.module.css';

export function Menu({icon, options, id}) {

    const stopEventPropogation = (event) => {
        event.stopPropagation();
    }

    const optionClicked = (event, option) => {
        stopEventPropogation(event);
        option.action();
    }


    return (
        <div className ={ styles.dropdown + " dropdown" } tabIndex="0">
            <button className={ styles.dropdown__toggle + " dropdown__toggle" }  onClick = { stopEventPropogation }>
                { icon }
            </button>
            
        <ul className={ styles.dropdown__menu + " dropdown__menu" }>
            {
                options.map( (option, index) => 
                    <li key = { index } className = { styles.dropdown__item + " dropdown__item" }
                    onClick = { (e) => { optionClicked(e, option) } }>
                         { option.title }
                    </li>)
            }
            {/* <a class="dropdown__item">Something 1</a>
            <a class="dropdown__item">Something 2 </a>
            <a class="dropdown__item">Something 3</a>
            <div class="dropdown__divider"></div>
            <a class="dropdown__item">Something else here</a> */}
        </ul>
    </div>
    )
}