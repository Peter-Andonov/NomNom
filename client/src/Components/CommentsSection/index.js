import React, { useState } from 'react';
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
    const [newComment, setNewComment] = useState('');
    const [exceedsLimit, setExceedsLimit] = useState(false);
    
    const commentCharLimit = 10;

    const checkLimit = (comment) => {
        if (comment.length > commentCharLimit) {
            setExceedsLimit(true);
        } else {
            setExceedsLimit(false);
        };
    };

    const handleInput = (newValue) => {
        setNewComment(newValue);
        checkLimit(newValue);
    }

    const toggleOpen = () => {
        setOpen(!open);
    };

    const postComment = async () => {

        if (!newComment || newComment.length > commentCharLimit) {
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
                hint="Write a comment..."
                actionName="Comment"
                value={newComment}
                exceedsLimit={exceedsLimit}
                commentCharLimit={commentCharLimit}
                setNewInput={handleInput}
                confirmInput={postComment}
            />}
            {open && props.children}
        </Wrapper>
    );
};


export default CommentsSection;