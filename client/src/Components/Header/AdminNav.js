import React, { useState } from 'react';
import styled from 'styled-components';
import TextItem from './TextItem';


const Container = styled.div`
    color: white;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
`;

const AdminNav = (props) => {

    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open)
    };

    return (
        <Container onClick={toggleOpen}>
            <TextItem label={"Admin"} />
            {open && props.children}
        </Container>
    );
};


export default AdminNav;