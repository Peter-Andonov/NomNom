import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import Input from './Input';
import Submit from './Submit';


const Wrapper = styled.div`
position: absolute;
top: 30vh;
height: 40rem;
width: 40rem;
background-color: white;
border-radius: 20px;
box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5);
`

const Form = styled.form`
height: 100%;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
`

export default class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: false,
            emailErrorMessage: '',
            password: '',
            passwordError: false,
            passwordErrorMessage: '',
            repeatPassword: '',
            repeatPasswordError: false
        }
    }

    setEmail = (newEmail) => {
        this.setState({
            email: newEmail
        })
    }

    setEmailError = (newEmailError) => {
        this.setState({
            emailError: newEmailError
        })
    }

    setEmailErrorMessage = (newEmailErrorMessage) => {
        this.setState({
            emailErrorMessage: newEmailErrorMessage
        })
    }

    setPassword = (newPassword) => {
        this.setState({
            password: newPassword
        })
    }

    setPasswordError = (newPasswordError) => {
        this.setState({
            passwordError: newPasswordError
        })
    }

    setPasswordErrorMessage = (newPasswordErrorMessage) => {
        this.setState({
            passwordErrorMessage: newPasswordErrorMessage
        })
    }

    setRepeatPassword = (newRepeatPassword) => {
        this.setState({
            repeatPassword: newRepeatPassword
        })
    }

    setRepeatPasswordError = (newRepeatPasswordError) => {
        this.setState({
            repeatPasswordError: newRepeatPasswordError
        })
    }

    validateEmail = () => {
        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.state.email)) {
            this.setEmailError(true);
            this.setEmailErrorMessage('This should look like an email');
        } else if (this.state.emailError) {
            this.setEmailError(false);
            this.setEmailErrorMessage('');
        }
    };

    validatePassword = () => {
        if (this.state.password.length < 6) {
            this.setPasswordError(true);
            this.setPasswordErrorMessage('*Password must be at least 6 characters long');
        } else if ((!/^[A-Za-z0-9]+$/.test(this.state.password))) {
            this.setPasswordError(true);
            this.setPasswordErrorMessage('*Password must contain only digits and english letters');
        }
        else if (this.state.passwordError) {
            this.setPasswordError(false);
            this.setPasswordErrorMessage('');
        }
    };

    validateRepeatPassword = () => {
        if (this.state.password !== this.state.repeatPassword) {
            this.setRepeatPasswordError(true);
        } else if (this.state.repeatPasswordError) {
            this.setRepeatPasswordError(false);
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
            repeatPassword: this.state.repeatPassword
        }
        try {
            const res = await Axios.post('http://localhost:5000/api/register', data);

            console.log(res);
        } catch (e) {
            console.log(e)
        }

    }

    render() {
        return (
            <Wrapper>
                <Form onSubmit={this.handleSubmit}>
                    <Input
                        id={'email'}
                        key={'email'}
                        label={'Email'}
                        type={'email'}
                        value={this.state.email}
                        error={this.state.emailError}
                        errorMessage={this.state.emailErrorMessage}
                        onChange={this.setEmail}
                        onBlur={this.validateEmail}
                    />
                    <Input
                        id={'password'}
                        key={'password'}
                        label={'Password'}
                        type={'password'}
                        value={this.state.password}
                        error={this.state.passwordError}
                        errorMessage={this.state.passwordErrorMessage}
                        onChange={this.setPassword}
                        onBlur={this.validatePassword}
                    />
                    <Input
                        id={'re-password'}
                        key={'re-password'}
                        label={'Repeat Password'}
                        type={'password'}
                        value={this.state.repeatPassword}
                        error={this.state.repeatPasswordError}
                        errorMessage={'*Passwords don`t match'}
                        onChange={this.setRepeatPassword}
                        onBlur={this.validateRepeatPassword}
                    />
                    <Submit label={'Register'} />
                </Form>
            </Wrapper>
        )
    };
};