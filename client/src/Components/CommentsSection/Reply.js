import React from 'react';
import styled from 'styled-components';
import AvatarPic from './AvatarPic';
import timeIcon from '../../Images/Icons/access_time-24px.svg';


const Wrapper = styled.div`
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: left;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: left;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
`;

const PosterName = styled.div`
    padding-left: 1rem;
`;

const Icon = styled.img`
    padding-left: 1rem;
`;

const PostedOn = styled.div`
    margin-left: 0.5rem;
    font-size: 1.1rem;
    color: grey;
`;

const CommentBody = styled.div`
    font-size: 1.1rem;
`;

const Reply = (props) => {

    const { email, firstName, lastName, profilePicUrl } = props.createdBy;
    const displayName = firstName ? `${firstName} ${lastName}` : email;
    const body = props.body;
    const date = new Date(props.createdAt)

    return (
        <Wrapper>
            <Row>
                <AvatarPic src={profilePicUrl} />
                <Column>
                    <PosterName>{displayName}</PosterName>
                    <Row>
                        <Icon src={timeIcon} />
                        <PostedOn>{`${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`}</PostedOn>
                    </Row>
                </Column>
            </Row>
            <CommentBody>{body}</CommentBody>
        </Wrapper>
    );
};


export default Reply;