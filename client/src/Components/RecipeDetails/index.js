import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import UserContext from '../../Context';
import * as utils from '../../Utils/user';
import IngredientSection from './IngredientSection';
import CommentsSection from '../CommentsSection';
import Comment from '../CommentsSection/Comment';


const Wrapper = styled.div`
    padding: 3rem;
    position: absolute;
    top: 30vh;
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

const LikeBtn = styled.button`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    font-size: 2rem;
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

    useEffect(() => {
        const getRecipe = async () => {

            const res = await Axios.get('http://localhost:5000/api/recipe', {
                params: {
                    id: recipeId.id
                }
            });

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
        };
        getRecipe();
    }, []);

    const addComment = (newComment) => {
        setComments([newComment, ...comments])
    };

    const addToFavorites = async (e) => {
        e.preventDefault();

        const token = utils.getCookieByName('auth-token');

        await Axios('http://localhost:5000/api/recipe/favourites', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': token
            }, data: {
                recipeId: recipeId.id
            }
        });
    };

    return (
        <Wrapper>
            <TitleContainer>
                <MainTitle>{title}</MainTitle>
                <LikeBtn onClick={addToFavorites} >Add to Favourites</LikeBtn>
            </TitleContainer>
            <Editor editorState={shortDescription} readOnly={true} />
            <InfoList>
                <InfoItem>
                    <InfoItemLabel>Time to prepare</InfoItemLabel>
                    <InfoItemValue>{`${prepTime} min`}</InfoItemValue>
                </InfoItem>
                <InfoItem>
                    <InfoItemLabel>Time to cook</InfoItemLabel>
                    <InfoItemValue>{`${cookTime} min`}</InfoItemValue>
                </InfoItem>
                <InfoItem>
                    <InfoItemLabel>Serves</InfoItemLabel>
                    <InfoItemValue>{serves}</InfoItemValue>
                </InfoItem>
                <InfoItem>
                    <InfoItemLabel>Difficulty</InfoItemLabel>
                    <InfoItemValue>{difficulty}</InfoItemValue>
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