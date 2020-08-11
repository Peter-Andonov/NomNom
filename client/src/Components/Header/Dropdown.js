import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    position: absolute;
    top: 100px;
    width: auto;
    min-width: 175px;
    display: flex;
    flex-direction: column;
    align-items: left;
    background: #333333;
    border: 1px solid #474a4d;
    border-radius: 5px;
`;


const DropdownMenu = (props) => {

    return (
        <Container>
            {props.children}
        </Container>
    );
};

export default DropdownMenu;