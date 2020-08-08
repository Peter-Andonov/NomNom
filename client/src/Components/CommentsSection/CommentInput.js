import React, { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../Context';
import AvatarPic from './AvatarPic';


const Wrapper = styled.div`
    padding: 3rem;
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

const CommentInput = (props) => {

    const userContext = useContext(UserContext);

    return (
        <Wrapper>
            <AvatarPic src={userContext.user.profilePicUrl} />
            <Input
                value={props.value}
                onChange={(e) => props.setNewComment(e.target.value)}
                placeholder="Write a comment..."
                type='text' />
        </Wrapper>
    );
};


export default CommentInput;