import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Axios from 'axios';
import styled from 'styled-components';
import UserContext from '../../Context';
import Input from './Input';
import Submit from './Submit';


const Wrapper = styled.div`
    width: 40rem;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

class RegisterForm extends Component {

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
        };
    };

    static contextType = UserContext;

    setEmail = (newEmail) => {
        this.setState({
            email: newEmail
        });
    };

    setEmailError = (newEmailError) => {
        this.setState({
            emailError: newEmailError
        });
    };

    setEmailErrorMessage = (newEmailErrorMessage) => {
        this.setState({
            emailErrorMessage: newEmailErrorMessage
        });
    };

    setPassword = (newPassword) => {
        this.setState({
            password: newPassword
        });
    };

    setPasswordError = (newPasswordError) => {
        this.setState({
            passwordError: newPasswordError
        });
    };

    setPasswordErrorMessage = (newPasswordErrorMessage) => {
        this.setState({
            passwordErrorMessage: newPasswordErrorMessage
        });
    };

    setRepeatPassword = (newRepeatPassword) => {
        this.setState({
            repeatPassword: newRepeatPassword
        });
    };

    setRepeatPasswordError = (newRepeatPasswordError) => {
        this.setState({
            repeatPasswordError: newRepeatPasswordError
        });
    };

    validateEmail = () => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)) {
            this.setEmailError(true);
            this.setEmailErrorMessage('* This should look like an email');
        } else if (this.state.emailError) {
            this.setEmailError(false);
            this.setEmailErrorMessage('');
        }
    };

    validatePassword = () => {
        if (this.state.password.length < 6) {
            this.setPasswordError(true);
            this.setPasswordErrorMessage('* Password must be at least 6 characters long');
        } else if ((!/^[A-Za-z0-9]+$/.test(this.state.password))) {
            this.setPasswordError(true);
            this.setPasswordErrorMessage('* Password must contain only digits and english letters');
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

    handleSubmit = (e) => {
        e.preventDefault();

        this.validateEmail();
        this.validatePassword();
        this.validateRepeatPassword();

        if (this.state.emailError || this.state.passwordError || this.state.repeatPasswordError) {
            return;
        };

        const data = {
            email: this.state.email,
            password: this.state.password,
            repeatPassword: this.state.repeatPassword
        };

        Axios.post('http://localhost:5000/api/register', data).then((res) => {
            document.cookie = `auth-token=${res.headers.authorization}`;
            const { _id, email, role, firstName, lastName, profilePicUrl, favouriteRecipes } = res.data;
            this.context.logIn({
                _id,
                email,
                role,
                firstName,
                lastName,
                profilePicUrl,
                favouriteRecipes
            });
            this.props.history.push('/');
        }).catch((error) => {
            this.setEmailError(true);
            this.setEmailErrorMessage(error.response.data.message);
        });
    };

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
                        errorMessage={'* Passwords don`t match'}
                        onChange={this.setRepeatPassword}
                        onBlur={this.validateRepeatPassword}
                    />
                    <Submit label={'Register'} />
                </Form>
            </Wrapper>
        )
    };
};


export default withRouter(RegisterForm);