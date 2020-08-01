import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


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

const UnStyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;


const RecipeCard = (props) => {

    return (
        <Wrapper>
            <UnStyledLink to={`/recipe/${props.id}`} >
                <Image src={props.coverImageUrl} alt='Recipe' />
                <Title>{props.title}</Title>
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                <PropTitle>Prep time</PropTitle>
                                <PropValue>{`${props.prepTime} min` || 'n/a'}</PropValue>
                            </td>
                            <td>
                                <PropTitle>Cook time</PropTitle>
                                <PropValue>{`${props.cookTime} min` || 'n/a'}</PropValue>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <PropTitle>Serves</PropTitle>
                                <PropValue>{props.serves || 'n/a'}</PropValue>
                            </td>
                            <td>
                                <PropTitle>Difficulty</PropTitle>
                                <PropValue>{props.difficulty || 'n/a'}</PropValue>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </UnStyledLink>
        </Wrapper>
    );
};


export default RecipeCard;