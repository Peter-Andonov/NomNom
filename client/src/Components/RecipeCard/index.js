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
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        cursor: pointer;
    }
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    object-fit: cover;
`;

const Container = styled.div`
    height: 60%;
    position: relative;
`;

const Title = styled.div`
    text-align: center;
    position: absolute;
    bottom: 0;
    background: rgb(0, 0, 0);
    background: rgba(0, 0, 0, 0.5);
    color: #f1f1f1;
    width: 100%;
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
    display: inline-block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
`;


const RecipeCard = (props) => {

    return (
        <Wrapper>
            <UnStyledLink to={`/recipe/${props.id}`} >
                <Container>
                    <Image src={props.coverImageUrl} alt='Recipe' />
                    <Title>{props.title}</Title>
                </Container>
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                <PropTitle>Prep time</PropTitle>
                                <PropValue>{props.prepTime ? `${props.prepTime} min` : 'n/a'}</PropValue>
                            </td>
                            <td>
                                <PropTitle>Cook time</PropTitle>
                                <PropValue>{props.cookTime ? `${props.cookTime} min` : 'n/a'}</PropValue>
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