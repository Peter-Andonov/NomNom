import React from 'react';
import styled from 'styled-components';
import matcha from '../../Images/matcha.jpg';


const Wrapper = styled.div`
    margin: 1rem 1.5rem 1rem 1.5rem;
    height: 24rem;
    width: 18rem;
    min-height: 24rem;
    min-width: 18rem;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5);
    transition: 0.3s;
    border-radius: 10%;
    background-color: white;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        cursor: pointer;
    }
`;

const Image = styled.img`
    height: 50%;
    width: 100%;
    border-radius: 10% 10% 0 0;
    object-fit: cover;
`;

const Title = styled.h4`
    margin: 0;
    padding: 0;
    text-align: center;
`;

const Table = styled.table`
    margin: 0;
    padding: 0;
    width: 100%;
`;

const PropTitle = styled.div`
    font-size: 1.2rem;
    text-align: center;
    color: grey;
`;

const PropValue = styled.div`
    font-size: 1rem;
    text-align: center;
`;


export default function RecipeCard() {

    return (
        <Wrapper>
            <Image src={matcha} alt='Recipe' />
            <Title>Green matcha</Title>
            <Table>
                <tbody>
                    <tr>
                        <td>
                            <PropTitle>Prep time</PropTitle>
                            <PropValue>30 min</PropValue>
                        </td>
                        <td>
                            <PropTitle>Cook time</PropTitle>
                            <PropValue>20 min</PropValue>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <PropTitle>Serves</PropTitle>
                            <PropValue>6</PropValue>
                        </td>
                        <td>
                            <PropTitle>Difficulty</PropTitle>
                            <PropValue>Medium</PropValue>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Wrapper>
    )
}