import React, { useState } from 'react';
import Axios from 'axios';
import * as utils from '../../Utils/user';
import styled from 'styled-components';
import AvatarPic from './AvatarPic';
import Reply from './Reply';
import CommentInput from './CommentInput';
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

const ReplyCount = styled.strong`
    font-size: 1.1rem;
    &:hover {
        color: rgba(237, 71, 59);
        cursor: pointer;
    };
`;

const ReplyWrapper = styled.div`
    padding-left: 3rem;
    display: flex;
    flex-direction: column;
    align-items: left;
`;

const Comment = (props) => {

    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState(props.replies);
    const [newReply, setNewReply] = useState('');
    const [exceedsLimit, setExceedsLimit] = useState(false);

    const { email, firstName, lastName, profilePicUrl } = props.createdBy;
    const displayName = firstName ? `${firstName} ${lastName}` : email;
    const body = props.body;
    const date = new Date(props.createdAt);
    
    const replyCharLimit = 300;

    const checkLimit = (reply) => {
        if (reply.length > replyCharLimit) {
            setExceedsLimit(true);
        } else {
            setExceedsLimit(false);
        };
    };

    const handleInput = (newValue) => {
        setNewReply(newValue);
        checkLimit(newValue);
    }

    const toggleOpen = () => {
        setShowReplies(!showReplies);
    };

    const postReply = async () => {

        if (!newReply || newReply.length > replyCharLimit) {
            return
        };

        const authToken = utils.getCookieByName('auth-token');

        const res = await Axios('http://localhost:5000/api/comment/reply', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': authToken
            }, data: {
                commentId: props.commentId,
                replyBody: newReply
            }
        });

        setNewReply('');

        setReplies([res.data, ...replies]);
    };

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
            <ReplyCount onClick={toggleOpen} >{replies.length} Replies</ReplyCount>
            {showReplies && <ReplyWrapper>
                <CommentInput
                    hint="Write a reply..."
                    actionName="Reply"
                    value={newReply}
                    exceedsLimit={exceedsLimit}
                    commentCharLimit={replyCharLimit}
                    setNewInput={handleInput}
                    confirmInput={postReply} />
                {replies.map((reply) =>
                    <Reply
                        key={reply._id}
                        body={reply.body}
                        createdBy={reply.createdBy}
                        createdAt={reply.createdAt}
                    />)}
            </ReplyWrapper>}
        </Wrapper>
    );
};


export default Comment;