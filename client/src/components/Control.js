import { Component } from 'react';
import styles from './Control.module.css';


class InputGroup extends Component {
    render() {
        return (
            <div className={styles.inputGroup}>
                {this.props.children}
            </div>
        );
    }
}


class Control extends Component {
    render() {
        return (
            <input
                {...this.props}
                className={styles.control} />
        );
    }
}

Control.defaultProps = {
    placeholder: "Enter data here",
};


class ErrorLabel extends Component {
    render() {
        return (
            <label {...this.props} className={styles.errorLabel}>{this.props.children}</label>
        );
    }
}


export {
    InputGroup,
    Control,
    ErrorLabel,
}