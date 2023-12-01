import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../components/Button';
import { InputGroup, Control, ErrorLabel } from '../components/Control';
import { NavLink } from 'react-router-dom';

import styles from './Register.module.css';
import { LOGIN_URL } from "../utils/urls";


const Register= () => {
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")


    const [emailError, setEmailError] = useState("")
    const [password1Error, setPassword1Error] = useState("")
    const [password2Error, setPassword2Error] = useState("")
    
   // const navigate = useNavigate();
        
    function onButtonClick() {
        setEmailError("")
        setPassword1Error("")
        setPassword2Error("")

        let isError = false;

        if ("" === email) {
            setEmailError("Please enter your email")
            isError = true;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            isError = true;
        }

        if ("" === password1) {
            setPassword1Error("Please enter a password")
            isError = true;
        }

        if (password1.length < 7) {
            setPassword1Error("The password must be 8 characters or longer")
            isError = true;
        }

        if (password1 !== password2) {
            setPassword1Error("The password are not the same")
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
                <div>Register</div>
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
                    value={password1}
                    type="password"
                    placeholder="Enter your password here"
                    onChange={ev => {setPassword1(ev.target.value); setPassword1Error("");}} 
                />
                <ErrorLabel>{password1Error}</ErrorLabel>
            </InputGroup>
            <InputGroup>
                <Control
                    value={password2}
                    type="password"
                    placeholder="Cpnfirm password"
                    onChange={ev => {setPassword2(ev.target.value); setPassword2Error("");}} 
                />
                <ErrorLabel>{password2Error}</ErrorLabel>
            </InputGroup>
       
            <InputGroup>
                <Button
                    style={{ background: '#F4a0b5' }}
                    onClick={onButtonClick}
                >
                    Register
                </Button>
            </InputGroup>

            <p>Already registered? <NavLink className={styles.loginLink} to={LOGIN_URL}>Log in</ NavLink></p>
        </div>
    )
}

export default Register