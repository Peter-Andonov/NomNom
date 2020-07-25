import React, { useState } from 'react';
import Input from './Input';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [rePassword, setRePassword] = useState('');
    const [rePasswordError, setRePasswordError] = useState(false);

    const validateUsername = () => {
        if(!email.includes("@")) {
            setEmailError(true);
        } else if(emailError) {
            setEmailError(false);
        }
    }

    const validatePassword = () => {
        if(!email.includes("@")) {
            setPasswordError(true);
        } else if(passwordError) {
            setPasswordError(false);
        }
    }

    const validateRePassword = () => {
        if(!email.includes("@")) {
            setRePasswordError(true);
        } else if(rePasswordError) {
            setRePasswordError(false);
        }
    }

    return (
        <form>
            <Input
                id={'email'}
                label={'Email'}
                type={'email'}
                value={email}
                error={emailError}
                onChange={setEmail}
                onBlur={validateUsername}
            />
            <Input
                id={'password'}
                label={'Password'}
                type={'password'}
                value={password}
                error={passwordError}
                onChange={setPassword}
                onBlur={validatePassword}
            />
            <Input
                id={'re-password'}
                label={'Repeat Password'}
                type={'password'}
                value={rePassword}
                error={rePasswordError}
                onChange={setRePassword}
                onBlur={validateRePassword}
            />
        </form>
    )
};

export default LoginForm;