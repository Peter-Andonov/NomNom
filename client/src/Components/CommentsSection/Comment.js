import React, { useState } from 'react';
import styled from 'styled-components';
import AvatarPic from './AvatarPic';
import timeIcon from '../../Images/Icons/access_time-24px.svg';
import replyIcon from '../../Images/Icons/reply-24px.svg';


const Wrapper = styled.div`
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: left;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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

const Reply = styled.strong`
    font-size: 1.1rem;
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

    return (
        <Wrapper>
            <Row>
                <AvatarPic />
                <Column>
                    <PosterName>Peter Andonov</PosterName>
                    <Row>
                        <Icon src={timeIcon} />
                        <PostedOn>January 1 2020</PostedOn>
                    </Row>
                </Column>
            </Row>
            <CommentBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel volutpat nisl, nec tincidunt risus. Nam faucibus, odio cursus gravida euismod, elit justo pharetra mauris, eget blandit magna purus sed magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam non velit vitae mauris blandit lacinia. Suspendisse potenti.</CommentBody>
            <Row>
                <Reply>6 Replies</Reply>
                <ReplyBtn>
                    <Icon src={replyIcon} />
                    <Reply>Reply</Reply>
                </ReplyBtn>
            </Row>
        </Wrapper>
    );
};


export default Comment;