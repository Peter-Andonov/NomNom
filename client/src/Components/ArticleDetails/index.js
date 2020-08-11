import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import * as utils from '../../Utils/user';
import UserContext from '../../Context';
import CommentsSection from '../CommentsSection';
import Comment from '../CommentsSection/Comment';
import ActionBar from '../RecipeDetails/ActionBar';
import GreenButton from '../RecipeDetails/GreenButton';
import RedButton from '../RecipeDetails/RedButton';


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


const ArticleDetails = () => {

    const articleId = useParams();
    const userContext = useContext(UserContext);
    const history = useHistory();
    const isLoggedIn = userContext.loggedIn;
    const isAdmin = userContext.user ? userContext.user.role === 'admin' : false;

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [body, setBody] = useState(EditorState.createEmpty());
    const [comments, setComments] = useState([]);

    useEffect(() => {
        Axios('http://localhost:5000/api/article', {
            method: 'GET',
            params: {
                id: articleId.id
            }
        }).then((res) => {
            setTitle(res.data.title);

            setImageUrl(res.data.imageUrl);

            const bodyContentState = convertFromRaw(JSON.parse(res.data.body));
            setBody(EditorState.createWithContent(bodyContentState));
            setComments(res.data.comments);
        }).catch((err) => {
            console.log(err)
        });
    }, [articleId.id]);

    const addComment = (newComment) => {
        setComments([newComment, ...comments])
    };

    const editArticle = (e) => {
        e.preventDefault();

        history.push(`/edit/article/${articleId.id}`)
    };

    const deleteArticle = (e) => {
        e.preventDefault();

        const authToken = utils.getCookieByName('auth-token');

        Axios('http://localhost:5000/api/article', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': authToken
            }, params: {
                id: articleId.id
            }
        }).then((res) => {
            history.push('/');
        }).catch((err) => {
            console.log(err)
        });
    };

    return (
        <Wrapper>
            <MainTitle>{title}</MainTitle>
            <Image src={imageUrl} alt='Article' />
            <EditorContainer>
                <Editor editorState={body} readOnly={true} />
            </EditorContainer>
            {isLoggedIn && isAdmin && <ActionBar>
                <GreenButton action={editArticle} label={'Edit Article'} />
                <RedButton action={deleteArticle} label={'Delete Article'} />
            </ActionBar>}
            {userContext.loggedIn && <CommentsSection
                entityId={articleId.id}
                entityType={'article'}
                addComment={addComment}
            >
                {comments && comments.map((comment) =>
                    <Comment
                        key={comment._id}
                        commentId={comment._id}
                        body={comment.body}
                        createdBy={comment.createdBy}
                        createdAt={comment.createdAt}
                        replies={comment.replies}
                    />)}
            </CommentsSection>}
        </Wrapper>
    );
};


export default ArticleDetails;