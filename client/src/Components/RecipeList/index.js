import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import RecipeCard from '../RecipeCard';
import PageInfo from '../PageInfo';


const Main = styled.main`
    margin: 1rem;
    padding: 1rem;
`;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: left;
`;


const RecipeList = () => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getRecipes = async () => {
            const res = await Axios.get('http://localhost:5000/api/recipe/all');
            setRecipes(res.data);
        }
        getRecipes();
    }, []);



    return (
        <Main>
            <PageInfo />
            <Container>
                {recipes.map((recipe) =>
                    <RecipeCard
                        key={recipe._id}
                        id={recipe._id}
                        title={recipe.title}
                        coverImageUrl={recipe.coverImageUrl}
                        prepTime={recipe.prepTime}
                        cookTime={recipe.cookTime}
                    />)}
            </Container>
        </Main>
    );
};


export default RecipeList;