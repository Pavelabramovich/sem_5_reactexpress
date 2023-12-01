import {default as ColorConverter} from '../middlewares/ColorConvertingMiddleware';

import styles from './Button.module.css';

function Button(props) {
    let style = props.style || {}

    style.background ||= '#AAA';
    style.color ||= 'white';

    style['background:hover'] ||= ColorConverter.subtractColors(style.background, [30, 30, 30]);
    style['color:hover'] ||= style.color;

    style['background:active'] ||= ColorConverter.subtractColors(style['background:hover'], [30, 30, 30]);
    style['color:active'] ||= style.color;

    const newProps = JSON.parse(JSON.stringify(props));
    newProps['style'] = style;

    const handleMouseEvent = (event) => {
        switch (event.type) {
            case "mousedown":
                event.target.style.backgroundColor = style['background:active'];
                event.target.style.color = style['color:active'];
                break
            case "mouseleave":
                event.target.style.backgroundColor = style.background;
                event.target.style.color = style.color;
                break;
            case "mouseenter":
            case "mouseup":
                event.target.style.backgroundColor = style['background:hover'];
                event.target.style.color = style['color:hover'];
                break;
        }
    }
    
    return (
        <button
            {...newProps}
            className={styles.inputButton}

            onMouseDown={handleMouseEvent}
            onMouseUp={handleMouseEvent}
            onMouseEnter={handleMouseEvent}
            onMouseLeave={handleMouseEvent}
        >
            {props.children}
        </button>
    );
}

export default Button;