import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    height: 35rem;
    width: 100%;
    min-height: 10rem;
    min-width: 15rem;
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5);
    transition: 0.3s;
    object-fit: cover;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        cursor: pointer;
    }
`;

const Remove = styled.div`
    margin-bottom: 1rem;
    width: fit-content;
    padding: 0;
    &:hover {
        color: rgba(237, 71, 59);
        cursor: pointer;
    }
`;


const PreviewCard = (props) => {

    return (
        <Wrapper >
            <Image src={props.imageUrl} />
            <Remove onClick={props.handleDelete} >Remove</Remove>
        </Wrapper>
    );
};


export default PreviewCard;