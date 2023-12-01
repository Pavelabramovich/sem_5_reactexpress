import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../components/Button';
import Control from '../components/Control';

import styles from './Login.module.css';


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    const navigate = useNavigate();
        
    const onButtonClick = () => {

        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        // Authentication calls will be made here...       

    }

    return <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
            <div>Login</div>
        </div>

       
        <div className={styles.inputContainer}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => {setEmail(ev.target.value); setEmailError("");}}
                className={styles.inputBox} />
            <label className={styles.errorLabel}>{emailError}</label>
        </div>
        <br />
        {/* <div className={styles.inputContainer}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => {setPassword(ev.target.value); setPasswordError("")}}
                className={styles.inputBox} />
            <label className={styles.errorLabel}>{passwordError}</label>
        </div>
        <br /> */}
        <div className={styles.inputContainer}>
            <Control 
                value={password}
                placeholder="Enter your password here"
                onChange={ev => {setPassword(ev.target.value);}}/>

            {/* <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => {setPassword(ev.target.value); setPasswordError("")}}
                className={styles.inputBox} />
            <label className={styles.errorLabel}>{passwordError}</label> */}
        </div>
        <br />
        <div className={styles.inputContainer}>
            <Button
                style={{ background: '#F4a0b5' }}
                onClick={onButtonClick}>
                Log in
            </Button>
        </div>
    </div>
}

export default Login