import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Wrapper = styled.div`
    margin: 1rem;
    height: 25rem;
    width: 20rem;
    min-height: 24rem;
    min-width: 18rem;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5);
    transition: 0.3s;
    border-radius: 1rem;
    background-color: white;
    position: relative;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        cursor: pointer;
    }
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 1rem;
    object-fit: cover;
`;

const Title = styled.div`
    text-align: center;
    position: absolute;
    bottom: 0;
    background: rgb(0, 0, 0);
    background: rgba(0, 0, 0, 0.5);
    color: #f1f1f1;
    width: 100%;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
`;

const UnStyledLink = styled(Link)`
    display: inline-block;
    width: 100%;
    height:100%;
    text-decoration: none;
    color: inherit;
`;


const ArticleCard = (props) => {

    return (
        <Wrapper>
            <UnStyledLink to={`/${props.entity}/${props.id}`} >
                <Image src={props.imageUrl} alt='Article' />
                <Title>{props.title}</Title>
            </UnStyledLink>
        </Wrapper>
    );
};


export default ArticleCard;