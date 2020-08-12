import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Axios from 'axios';
import styled from 'styled-components';
import UserContext from '../../Context';
import Input from '../RegisterForm/Input';
import Submit from '../RegisterForm/Submit';


const Wrapper = styled.div`
    height: 20rem;
    width: 40rem;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5);
`;

const Form = styled.form`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;


class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: ``,
            password: ``,
            error: false,
            errorMessage: ``
        };
    };

    static contextType = UserContext;

    setEmail = (newEmail) => {
        this.setState({
            email: newEmail
        });
    };

    setPassword = (newPassword) => {
        this.setState({
            password: newPassword
        });
    };

    setError = (errorValue) => {
        this.setState({
            error: errorValue
        });
    };

    setErrorMessage = (message) => {
        this.setState({
            errorMessage: message
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password
        };

        Axios.post('http://localhost:5000/api/login', data).then((res) => {
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
            this.setError(true);
            this.setErrorMessage(error.response.data.message);
        });
    };

    render() {
        return (
            <Wrapper>
                <Form onSubmit={this.handleSubmit}>
                    <Input
                        id={'email'}
                        label={'Email'}
                        type={'email'}
                        value={this.state.email}
                        error={this.state.error}
                        errorMessage={this.state.errorMessage}
                        onChange={this.setEmail}
                    />
                    <Input
                        id={'password'}
                        label={'Password'}
                        type={'password'}
                        value={this.state.password}
                        onChange={this.setPassword}
                    />
                    <Submit label={'Login'} />
                </Form>
            </Wrapper>
        );
    };
};


export default withRouter(LoginForm);