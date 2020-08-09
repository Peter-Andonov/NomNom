import React, { useState, useContext } from 'react';
import Axios from 'axios';
import * as utils from '../../Utils/user';
import styled from 'styled-components';
import CommentInput from './CommentInput';


const Wrapper = styled.div`
    padding: 3rem;
    display: flex;
    flex-direction: column;
`;

const HeadingContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid grey;
`;

const ToggleDiv = styled.div`
    margin-left: 3rem;
    &:hover {
        color: rgba(237, 71, 59);
        cursor: pointer;
    };
`;

const CommentsSection = (props) => {

    const [open, setOpen] = useState(false);
    const [newComment, setNewComment] = useState('')

    const toggleOpen = () => {
        setOpen(!open);
    };

    const postComment = async () => {

        if (!newComment) {
            return
        };

        const authToken = utils.getCookieByName('auth-token');

        const res = await Axios('http://localhost:5000/api/comment/recipe', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': authToken
            }, data: {
                recipeId: props.entityId,
                commentBody : newComment
            }
        });

        setNewComment('');

        props.addComment(res.data)
    };

    return (
        <Wrapper>
            <HeadingContainer>
                <ToggleDiv onClick={toggleOpen} >{open ? 'Hide comments' : 'Show comments'}</ToggleDiv>
            </HeadingContainer>
            {open && <CommentInput
                value={newComment}
                setNewComment={setNewComment}
                postComment={postComment}
            />}
            {open && props.children}
        </Wrapper>
    );
};


export default CommentsSection;