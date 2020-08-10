import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import UserContext from '../../Context';
import CommentsSection from '../CommentsSection';
import Comment from '../CommentsSection/Comment';


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

    return (
        <Wrapper>
            <MainTitle>{title}</MainTitle>
            <Image src={imageUrl} alt='Article' />
            <EditorContainer>
                <Editor editorState={body} readOnly={true} />
            </EditorContainer>
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