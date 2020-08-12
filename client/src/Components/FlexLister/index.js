import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: left;
`;


const FlexLister = (props) => {

    return (
        <Container>
            {props.children}
        </Container>
    );
};


export default FlexLister;