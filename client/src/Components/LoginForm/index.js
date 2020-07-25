import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import Input from '../RegisterForm/Input';
import Submit from '../RegisterForm/Submit';


const Wrapper = styled.div`
    position: absolute;
    top: 30vh;
    height: 20rem;
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


export default class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: ``,
            password: ``
        }
    }

    setEmail = (newEmail) => {
        this.setState({
            email: newEmail
        })
    }

    setPassword = (newPassword) => {
        this.setState({
            password: newPassword
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        try {
            const res = await Axios.post('http://localhost:5000/api/login', data);

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
                        label={'Email'}
                        type={'email'}
                        value={this.email}
                        onChange={this.setEmail}
                    />
                    <Input
                        id={'password'}
                        label={'Password'}
                        type={'password'}
                        value={this.password}
                        onChange={this.setPassword}
                    />
                    <Submit label={'Login'} />
                </Form>
            </Wrapper>
        )
    };
};