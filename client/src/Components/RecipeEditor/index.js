import React, { Component } from 'react';
import styled from 'styled-components';
import TextEditor from '../TextEditor';
import ImageSelector from '../ImageSelector';
import Input from '../RegisterForm/Input';
import IngredientsTable from './IngredientsTable';


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


class RecipeEditor extends Component {
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
                <h1>Create Recipe</h1>
                <h3>Add Recipe Title</h3>
                <Input onChange={this.setTitle} />
                <h3>Add Main Image</h3>
                <ImageSelector />
                <h3>Add Short Description</h3>
                <TextEditor />
                <h3>Add Steps to create</h3>
                <TextEditor />
                <h3>Add Ingredients</h3>
                <IngredientsTable />
            </Wrapper>
        )
    }
}

export default RecipeEditor;