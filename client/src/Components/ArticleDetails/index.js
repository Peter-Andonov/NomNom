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
            <EditorContainer>
                <Editor editorState={body} readOnly={true} />
            </EditorContainer>
        </Wrapper>
    );
};


export default RecipeDetails;