import ColorConverter from '../utils/ColorConverter';

import styles from './Button.module.css';

function Button(props) {
    let style = props.style || {}

    style.background ||= '#AAA';
    style.borderColor ||= style.background;
    style.color ||= 'white';
    
    style.backgroundHover ||= ColorConverter.subtractColors(style.background, [30, 30, 30]);
    style.borderColorHover ||= style.backgroundHover;
    style.colorHover ||= style.color;

    style.backgroundActive ||= ColorConverter.subtractColors(style.backgroundHover, [30, 30, 30]);
    style.borderColorActive ||= style.backgroundActive;
    style.colorActive ||= style.color;

    const handleMouseEvent = (event) => {
        switch (event.type) {
            case "mousedown":
                event.target.style.backgroundColor = style.backgroundActive;
                event.target.style.borderColor = style.borderColorActive;
                event.target.style.color = style.colorActive;
                break
            case "mouseleave":
                event.target.style.backgroundColor = style.background;
                event.target.style.borderColor = style.borderColor;
                event.target.style.color = style.color;
                break;
            case "mouseenter":
            case "mouseup":
                event.target.style.backgroundColor = style.backgroundHover;
                event.target.style.borderColor = style.borderColorHover;
                event.target.style.color = style.colorHover;
                break;
        }
    }
    
    return (
        <button
            {...props}
            style={style}
            className={`${styles.inputButton} ${props.className || ''}`}

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