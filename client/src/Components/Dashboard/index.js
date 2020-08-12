import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    padding: 3rem;
    background-color: white;
    height: auto;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: left;
    justify-content: space-around;
`;

const Dashboard = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    );
};


export default Dashboard;