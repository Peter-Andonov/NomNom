import React, { useState } from 'react';
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

    const toggleOpen = () => {
        setOpen(!open);
    };

    return(
        <Wrapper>
            <HeadingContainer>
                <ToggleDiv onClick={toggleOpen} >{open ? 'Hide comments' : 'Show comments'}</ToggleDiv>
            </HeadingContainer>
            {open && <CommentInput />}
            {open && props.children}
        </Wrapper>
    );
};


export default CommentsSection;