import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    `

const Label = styled.label`
    font-size: 1.8rem;
    color: rgba(237, 71, 59);
    `

const StyledInput = styled.input`
    font-size: 1.5rem;
    width: 60%;
    padding: 0.5rem;
    border-radius: 5px;
    border: 2px solid black;
    `

const ErrorMessage = styled.div`
    font-size: 1rem;
    color: red;
    `

export default class Input extends Component {

    constructor(props) {
        super(props)
    }

    handleChange = (e) => {
        this.props.onChange(e.target.value);
    }
    
    render() {
        return (
            <Wrapper>
                <Label htmlFor={this.props.id}>{this.props.label}</Label>
                <StyledInput
                    id={this.props.id}
                    type={this.props.type}
                    value={this.props.value}
                    onChange={this.handleChange}
                    onBlur={this.props.onBlur}
                />
                {this.props.error && <ErrorMessage>{this.props.errorMessage}</ErrorMessage>}
            </Wrapper>
        )
    };
};
