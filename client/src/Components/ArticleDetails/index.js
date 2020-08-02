import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { Editor, EditorState, convertFromRaw } from "draft-js";


const Wrapper = styled.div`
    padding: 3rem;
    position: absolute;
    top: 30vh;
    background-color: white;
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: left;
`;

const Image = styled.img`
    margin-bottom: 3rem;
    object-fit: contain;
`;

const MainTitle = styled.h1`
    margin: 0;
`;


const RecipeDetails = () => {

    const articleId = useParams();

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [body, setBody] = useState(EditorState.createEmpty());

    useEffect(() => {
        const getArticle = async () => {

            const res = await Axios.get('http://localhost:5000/api/article', {
                params: {
                    id: articleId.id
                }
            });

            setTitle(res.data.title);

            setImageUrl(res.data.imageUrl);

            const bodyContentState = convertFromRaw(JSON.parse(res.data.body));
            setBody(EditorState.createWithContent(bodyContentState));
        };
        getArticle();
    }, []);

    return (
        <Wrapper>
            <MainTitle>{title}</MainTitle>
            <Image src={imageUrl} alt='Article' />
            <Editor editorState={body} readOnly={true} />
        </Wrapper>
    );
};


export default RecipeDetails;