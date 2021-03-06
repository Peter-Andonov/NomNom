import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import UserContext from '../../Context';
import * as utils from '../../Utils/user';
import IngredientSection from './IngredientSection';
import CommentsSection from '../CommentsSection';
import Comment from '../CommentsSection/Comment';
import ActionBar from './ActionBar';
import GreenButton from './GreenButton';
import RedButton from './RedButton';


const Wrapper = styled.div`
    padding: 3rem;
    background-color: white;
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: left;
`;

const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: left;
`;

const Aside = styled.aside`
    padding-right: 3rem;
    flex: 1;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Main = styled.main`
    padding-left: 3rem;
    border-left: 1px solid grey;
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: left;
`;

const InfoList = styled.ul`
    margin-top: 3rem;
    margin-bottom: 6rem;
    border: 1px solid grey;
    list-style-type: none;
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;

const InfoItem = styled.li`
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-right: 1px solid grey;
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:last-child{
        border: 0;
    }
`;

const InfoItemLabel = styled.div`
    font-size: 1.1rem;
    color: grey;
`;

const InfoItemValue = styled.strong`
    font-size: 2rem;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const MainTitle = styled.h1`
    flex: 1;
    margin: 0;
`;

const SubTitle = styled.h3`
    margin: 0;
    padding-bottom: 3rem;
`;

const Image = styled.img`
    margin-bottom: 3rem;
    object-fit: contain;
`;


const RecipeDetails = () => {

    const recipeId = useParams();
    const userContext = useContext(UserContext);
    const history = useHistory();
    const isLoggedIn = userContext.loggedIn;
    const isAdmin = userContext.user ? userContext.user.role === 'admin' : false;
    const hasLikedState = userContext.user ? userContext.user.favouriteRecipes.includes(recipeId.id) : false;

    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState(EditorState.createEmpty());
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [stepsToCreate, setStepsToCreate] = useState(EditorState.createEmpty());
    const [ingredients, setIngredients] = useState([]);
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [serves, setServes] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [comments, setComments] = useState([]);
    const [userHasLiked, setUserHasLiked] = useState(hasLikedState);


    useEffect(() => {
        Axios('http://localhost:5000/api/recipe', {
            method: 'GET',
            params: {
                id: recipeId.id
            }
        }).then((res) => {
            setTitle(res.data.title);

            const shortDescriptionContentState = convertFromRaw(JSON.parse(res.data.shortDescription));
            setShortDescription(EditorState.createWithContent(shortDescriptionContentState));

            setCoverImageUrl(res.data.coverImageUrl);

            const stepsToCreateContentState = convertFromRaw(JSON.parse(res.data.stepsToCreate));
            setStepsToCreate(EditorState.createWithContent(stepsToCreateContentState));

            setIngredients(res.data.ingredientSets);

            setPrepTime(res.data.prepTime);
            setCookTime(res.data.cookTime);
            setServes(res.data.serves);
            setDifficulty(res.data.difficulty);
            setComments(res.data.comments);
        }).catch((err) => {
            console.log(err)
        });
    }, [recipeId.id]);

    const addComment = (newComment) => {
        setComments([newComment, ...comments])
    };

    const editRecipe = (e) => {
        e.preventDefault();

        history.push(`/edit/recipe/${recipeId.id}`)
    };

    const deleteRecipe = (e) => {
        e.preventDefault();

        const authToken = utils.getCookieByName('auth-token');

        Axios('http://localhost:5000/api/recipe', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': authToken
            }, params: {
                id: recipeId.id
            }
        }).then((res) => {
            history.push('/');
        }).catch((err) => {
            console.log(err)
        });
    };

    const addToFavorites = async (e) => {
        e.preventDefault();

        const authToken = utils.getCookieByName('auth-token');

        Axios('http://localhost:5000/api/recipe/like', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': authToken
            }, data: {
                recipeId: recipeId.id
            }
        }).then((res) => {
            userContext.logIn({
                _id: res.data._id,
                email: res.data.email,
                role: res.data.role,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                profilePicUrl: res.data.profilePicUrl,
                favouriteRecipes: res.data.favouriteRecipes
            });
            setUserHasLiked(true);
        }).catch((err) => {
            console.log(err)
        });
    };

    const removeFromFavorites = async (e) => {
        e.preventDefault();

        const authToken = utils.getCookieByName('auth-token');

        Axios('http://localhost:5000/api/recipe/dislike', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': authToken
            }, data: {
                recipeId: recipeId.id
            }
        }).then((res) => {
            userContext.logIn({
                _id: res.data._id,
                email: res.data.email,
                role: res.data.role,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                profilePicUrl: res.data.profilePicUrl,
                favouriteRecipes: res.data.favouriteRecipes
            });
            setUserHasLiked(false);
        }).catch((err) => {
            console.log(err)
        });
    };

    return (
        <Wrapper>
            <TitleContainer>
                <MainTitle>{title}</MainTitle>
                <ActionBar>
                    {isLoggedIn && !isAdmin && !userHasLiked && <GreenButton action={addToFavorites} label={'Add to Favourites'} />}
                    {isLoggedIn && !isAdmin && userHasLiked && <RedButton action={removeFromFavorites} label={'Remove from Favourites'} />}
                    {isLoggedIn && isAdmin && <GreenButton action={editRecipe} label={'Edit Recipe'} />}
                    {isLoggedIn && isAdmin && <RedButton action={deleteRecipe} label={'Delete Recipe'} />}
                </ActionBar>
            </TitleContainer>
            <Editor editorState={shortDescription} readOnly={true} />
            <InfoList>
                <InfoItem>
                    <InfoItemLabel>Time to prepare</InfoItemLabel>
                    <InfoItemValue>{prepTime ? `${prepTime} min` : 'n/a'}</InfoItemValue>
                </InfoItem>
                <InfoItem>
                    <InfoItemLabel>Time to cook</InfoItemLabel>
                    <InfoItemValue>{cookTime ? `${cookTime} min` : 'n/a'}</InfoItemValue>
                </InfoItem>
                <InfoItem>
                    <InfoItemLabel>Serves</InfoItemLabel>
                    <InfoItemValue>{serves || 'n/a'}</InfoItemValue>
                </InfoItem>
                <InfoItem>
                    <InfoItemLabel>Difficulty</InfoItemLabel>
                    <InfoItemValue>{difficulty || 'n/a'}</InfoItemValue>
                </InfoItem>
            </InfoList>
            <Container>
                <Aside>
                    <SubTitle>Ingredients</SubTitle>
                    {ingredients.map((ingredientSet) =>
                        <IngredientSection
                            key={ingredientSet._id}
                            name={ingredientSet.name}
                            quantitiesArr={ingredientSet.quantities}
                            unitsArr={ingredientSet.units}
                            ingredientsArr={ingredientSet.ingredients}
                        />)}
                </Aside>
                <Main>
                    <SubTitle>Instructions</SubTitle>
                    <Image src={coverImageUrl} alt='Recipe' />
                    <Editor editorState={stepsToCreate} readOnly={true} />
                </Main>
            </Container>
            {userContext.loggedIn && <CommentsSection
                entityId={recipeId.id}
                entityType={'recipe'}
                addComment={addComment}
            >
                {comments && comments.map((comment) =>
                    <Comment
                        key={comment._id}
                        commentId={comment._id}
                        body={comment.body}
                        createdBy={comment.createdBy}
                        createdAt={comment.createdAt}
                        replies={comment.replies}
                    />)}
            </CommentsSection>}
        </Wrapper>
    );
};


export default RecipeDetails;