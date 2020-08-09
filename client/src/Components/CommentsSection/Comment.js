import React, { useState } from 'react';
import styled from 'styled-components';
import AvatarPic from './AvatarPic';
import Reply from './Reply';
import timeIcon from '../../Images/Icons/access_time-24px.svg';
import replyIcon from '../../Images/Icons/reply-24px.svg';


const Wrapper = styled.div`
    padding: 3rem, 1.5rem, 3rem, 1.5rem;
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

const ReplyCount = styled.strong`
    font-size: 1.1rem;
    &:hover {
        color: rgba(237, 71, 59);
        cursor: pointer;
    };
`;

const ReplyBtn = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    &:hover {
        color: rgba(237, 71, 59);
        cursor: pointer;
    };
`;

const Comment = (props) => {

    const [showReplies, setShowReplies] = useState(false);

    const toggleOpen = () => {
        setShowReplies(!showReplies);
    };

    const { email, firstName, lastName, profilePicUrl } = props.createdBy;
    const displayName = firstName ? `${firstName} ${lastName}` : email;
    const body = props.body;
    const replies = props.replies;
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
            <Row>
                <ReplyCount onClick={toggleOpen} >{replies.length} Replies</ReplyCount>
                <ReplyBtn>
                    <Icon src={replyIcon} />
                    <ReplyCount>Reply</ReplyCount>
                </ReplyBtn>
            </Row>
            {showReplies && <Column>
                {replies.map((reply) =>
                    <Reply
                        key={reply._id}
                        body={reply.body}
                        createdBy={reply.createdBy}
                        createdAt={reply.createdAt}
                    />)}
                </Column>}
        </Wrapper>
    );
};


export default Comment;