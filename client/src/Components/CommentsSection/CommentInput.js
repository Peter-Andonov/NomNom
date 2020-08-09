import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../Context';
import AvatarPic from './AvatarPic';


const Wrapper = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const Input = styled.input`
    font-size: 1.5rem;
    width: 100%;
    margin-left: 3rem;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: groove;
    &:focus {
        outline: none;
    };
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
`;

const Spacer = styled.div`
    flex: 1;
`;

const Action = styled.div`
    padding-left: 1.5rem;
    &:hover {
        color: rgba(237, 71, 59);
        cursor: pointer;
    };
`;

const CommentInput = (props) => {

    const userContext = useContext(UserContext);

    const [showActions, setShowActions] = useState(false);

    const declineComment = () => {
        props.setNewComment("");
        setShowActions(false);
    }

    return (
        <Wrapper>
            <Row>
                <AvatarPic src={userContext.user.profilePicUrl} />
                <Input
                    value={props.value}
                    onChange={(e) => props.setNewComment(e.target.value)}
                    onFocus={(e) => setShowActions(true)}
                    placeholder="Write a comment..."
                    type='text' />
            </Row>
            {showActions && <Actions>
                <Spacer />
                <Action onClick={declineComment} >Cancel</Action>
                <Action onClick={props.postComment} >Comment</Action>
            </Actions>}
        </Wrapper>
    );
};


export default CommentInput;