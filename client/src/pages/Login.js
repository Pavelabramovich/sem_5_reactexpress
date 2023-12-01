import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../components/Button';
import { InputGroup, Control, ErrorLabel } from '../components/Control';
import { NavLink } from 'react-router-dom';

import styles from './Login.module.css';
import { REGISTRATION_URL } from "../utils/urls";


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
  //s  const navigate = useNavigate();
        
    function onButtonClick() {
        setEmailError("")
        setPasswordError("")

        let isError = false;

        if ("" === email) {
            setEmailError("Please enter your email")
            isError = true;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            isError = true;
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            isError = true;
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            isError = true;
        }

        if (isError) {
            return;
        }

        // Authentication calls will be made here...       
        
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.titleContainer}>
                <div>Login</div>
            </div> 
            <InputGroup>
                <Control
                    value={email}
                    placeholder="Enter your email here"
                    onChange={ev => {setEmail(ev.target.value); setEmailError("");}} 
                />
                <ErrorLabel>{emailError}</ErrorLabel>
            </InputGroup>
            <InputGroup>
                <Control
                    value={password}
                    type="password"
                    placeholder="Enter your password here"
                    onChange={ev => {setPassword(ev.target.value); setPasswordError("");}} 
                />
                <ErrorLabel>{passwordError}</ErrorLabel>
            </InputGroup>
       
            <InputGroup>
                <Button
                    style={{ background: '#F4a0b5' }}
                    onClick={onButtonClick}
                >
                    Log in
                </Button>
            </InputGroup>

            <p>Not registered? <NavLink className={styles.registerLink} to={REGISTRATION_URL}>Register</ NavLink></p>
        </div>
    )
}

export default Login