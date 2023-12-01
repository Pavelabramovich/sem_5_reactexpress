import { useState } from "react";
import {Component} from 'react';
import styles from './Control.module.css';

class Control extends Component {
    constructor() {
        super();
        
//        this.errorMessage = this.props?.errorMessage;
        this.isErrorVisible = true;
    }
    
    clearError() {
        this.isErrorVisible = false;
    }


    render() {
      return (
        <div className={styles.inputContainer}>
            <input
                {...this.props}
                className={styles.inputBox}
                onChange={ev => {this.props.isClearErrorsOnChange && this.clearError(); this.props.onChange(ev)}} 
             />

                {/* value={password}
                placeholder="Enter your password here"
                onChange={ev => {setPassword(ev.target.value); setPasswordError("")}} */}
                
            <label className={styles.errorLabel}>{this.isErrorVisible && this.props.errorMessage}</label>
        </div>
      );
    }
}

Control.defaultProps = {
    placeholder: "Enter data here",
    errorMessage: "Invalid data, try again",
    clearErrorOnChange: true,
};

export default Control;