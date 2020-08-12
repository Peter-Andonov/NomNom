import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Image = styled.img`
    height: 4rem;
    width: 6rem;
    border-radius: 1rem;
    object-fit: cover;
`;


const ListItem = (props) => {

    return (
        <Wrapper>
            {props.src && <Image src={props.src} />}
            <div>{props.title}</div>
            {props.metricLabel && <div>{`${props.metricValue} ${props.metricLabel}`}</div>}
        </Wrapper>
    );
};


export default ListItem;