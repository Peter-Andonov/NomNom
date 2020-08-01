import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: left;
`;

const IngredientSection = (props) => {

    const { name, quantitiesArr, unitsArr, ingredientsArr } = props;

    return (
        <Wrapper>
            <h4>{name}</h4>
            {ingredientsArr.map((ingredient, idx) =>
                <Container key={idx}>
                    <div>{quantitiesArr[idx]}</div>
                    <div>{unitsArr[idx].name}</div>
                    <div>{ingredient.name}</div>
                </Container>
            )}
        </Wrapper>
    );
};


export default IngredientSection;