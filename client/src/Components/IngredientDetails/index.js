import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import * as utils from '../../Utils/user';
import UserContext from '../../Context';
import ActionBar from '../RecipeDetails/ActionBar';
import GreenButton from '../RecipeDetails/GreenButton';
import RedButton from '../RecipeDetails/RedButton';


const Wrapper = styled.div`
    padding: 3rem;
    background-color: white;
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const EditorContainer = styled.div`
    margin-left: 5rem;
    width: 100%;
`;

const Image = styled.img`
    margin-bottom: 3rem;
    object-fit: contain;
`;

const MainTitle = styled.h1`
    margin: 0;
    margin-bottom: 2rem;
`;


const IngredientDetails = () => {

    const ingredientId = useParams();
    const userContext = useContext(UserContext);
    const history = useHistory();
    const isAdmin = userContext.user ? userContext.user.role === 'admin' : false;

    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState(EditorState.createEmpty());

    useEffect(() => {
        Axios('http://localhost:5000/api/ingredient', {
            method: 'GET',
            params: {
                id: ingredientId.id
            }
        }).then((res) => {
            setName(res.data.name);

            setImageUrl(res.data.imageUrl);

            const descriptionContentState = convertFromRaw(JSON.parse(res.data.description));
            setDescription(EditorState.createWithContent(descriptionContentState));
        }).catch((err) => {
            console.log(err)
        });
    }, [ingredientId.id]);

    const editIngredient = (e) => {
        e.preventDefault();

        history.push(`/edit/ingredient/${ingredientId.id}`)
    };

    const deleteIngredient = (e) => {
        e.preventDefault();

        const authToken = utils.getCookieByName('auth-token');

        Axios('http://localhost:5000/api/ingredient', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': authToken
            }, params: {
                id: ingredientId.id
            }
        }).then((res) => {
            history.push('/');
        }).catch((err) => {
            console.log(err)
        });
    };

    return (
        <Wrapper>
            <MainTitle>{name}</MainTitle>
            <Image src={imageUrl} alt='Ingredient' />
            <EditorContainer>
                <Editor editorState={description} readOnly={true} />
            </EditorContainer>
            {isAdmin && <ActionBar>
                <GreenButton action={editIngredient} label={'Edit Ingredient'} />
                <RedButton action={deleteIngredient} label={'Delete Ingredient'} />
            </ActionBar>}
        </Wrapper>
    );
};


export default IngredientDetails;