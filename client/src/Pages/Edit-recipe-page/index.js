import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Axios from 'axios';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import AdminHeader from '../../Components/AdminHeader';
import RecipeEditor from '../../Components/RecipeEditor';


const EditRecipePage = () => {

    const recipeId = useParams();

    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        Axios('http://localhost:5000/api/recipe', {
            method: 'GET',
            params: {
                id: recipeId.id
            }
        }).then((res) => {
            setRecipe(res.data);
            
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        });
    }, [recipeId.id]);

    return (
        <PageLayout>
            <HeaderImage />
            <RecipeEditor
             title={recipe.title} 
            />
            <AdminHeader />
        </PageLayout>
    );
};


export default EditRecipePage;