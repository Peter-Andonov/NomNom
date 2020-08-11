import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ActionBar = (props) => {

    return (
        <Container>
            {props.children}
        </Container>
    );
};


export default ActionBar;