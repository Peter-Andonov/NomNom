import React, { Component } from 'react';
import styled from 'styled-components';
import TextEditor from '../TextEditor';
import ImageSelector from '../ImageSelector';
import Input from '../RegisterForm/Input';


const Wrapper = styled.div`
    position: absolute;
    top: 30vh;
    background-color: white;
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


class IngredientEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        }
    }

    setTitle = (newTitle) => {
        this.setState({
            title: newTitle
        })
    }

    render() {
        return (
            <Wrapper>
                <h1>Create Ingredient</h1>
                <h3>Add Ingredient Title</h3>
                <Input value={this.state.title} onChange={this.setTitle} />
                <h3>Add Cover Image</h3>
                <ImageSelector />
                <h3>Add Description</h3>
                <TextEditor />
            </Wrapper>
        )
    }
}

export default IngredientEditor;