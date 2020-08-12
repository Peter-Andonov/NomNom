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

const SectionHeading = styled.h4`
    margin: 0;
`;

const SectionItem = styled.div`
    padding-left: 1rem;
`;


const IngredientSection = (props) => {

    const { name, quantitiesArr, unitsArr, ingredientsArr } = props;

    return (
        <Wrapper>
            <SectionHeading>{name}</SectionHeading>
            {ingredientsArr.map((ingredient, idx) =>
                <Container key={idx}>
                    <SectionItem>{quantitiesArr[idx] ? quantitiesArr[idx] : ''}</SectionItem>
                    <SectionItem>{unitsArr[idx] ? unitsArr[idx].name : ''}</SectionItem>
                    <SectionItem>{ingredient.name || ''}</SectionItem>
                </Container>
            )}
        </Wrapper>
    );
};


export default IngredientSection;