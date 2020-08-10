import React, { useState } from 'react';
import InputRow from './InputRow';
import styled from 'styled-components';
import addIcon from '../../Images/Icons/add-24px.svg';
import removeIcon from '../../Images/Icons/remove-24px.svg';


const Wrapper = styled.div`
    background-color: rgb(205, 255, 204);
    padding: 1.5rem;
    margin: 1.5rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const StyledInput = styled.input`
    font-size: 1.2rem;
    width: 50%;
    padding: 0.5rem;
    border-radius: 5px;
    border: 2px solid black;
`;

const SectionIcon = styled.img`
    margin-left: 0.5rem;
    &:hover{
        cursor: pointer;
    }
`;

const ColHeading = styled.td`
    text-align: center;
`;

const IngredientsTable = (props) => {

    const [inputFields, setInputFields] = useState(['input-0']);

    const addInput = () => {
        const newInput = `input-${inputFields.length}`;
        setInputFields([...inputFields, newInput]);
    };

    const removeInput = () => {

        if (inputFields.length === 1) {
            return;
        }
        //remove the last input field from the state
        const newInputFields = [...inputFields];
        newInputFields.splice((newInputFields.length - 1), 1);
        setInputFields(newInputFields);

        //remove the last quantity input value from the state
        const newQuantityInputValues = [...props.sectionState.quantities];
        newQuantityInputValues.splice((newQuantityInputValues.length - 1), 1);
        props.sectionState.quantities = newQuantityInputValues;

        //remove the last unit input value from the state
        const newUnitInputValues = [...props.sectionState.units];
        newUnitInputValues.splice((newUnitInputValues.length - 1), 1);
        props.sectionState.units = newUnitInputValues;

        //remove the last ingredient input value from the state
        const newInngredientInputValues = [...props.sectionState.ingredients];
        newInngredientInputValues.splice((newInngredientInputValues.length - 1), 1);
        props.sectionState.ingredients = newInngredientInputValues;
    };

    const handleNameInput = (value) => {
        const { id, quantities, units, ingredients } = { ...props.sectionState };
        const newName = value;
        props.handleInput({
            id,
            name: newName,
            quantities,
            units,
            ingredients
        });
    }

    const handleQuantityInputValues = (value, idx) => {
        const { id, name, quantities, units, ingredients } = { ...props.sectionState };
        const newQuantities = [...quantities];
        newQuantities[idx] = value;
        props.handleInput({
            id,
            name,
            quantities: newQuantities,
            units,
            ingredients
        });
    };

    const handleUnitInputValues = (value, idx) => {
        const { id, name, quantities, units, ingredients } = { ...props.sectionState };
        const newUnits = [...units];
        newUnits[idx] = value;
        props.handleInput({
            id,
            name,
            quantities,
            units: newUnits,
            ingredients
        });
    };

    const handleIngredientInputValues = (value, idx) => {
        const { id, name, quantities, units, ingredients } = { ...props.sectionState };
        const newIngredients = [...ingredients];
        newIngredients[idx] = value;
        props.handleInput({
            id,
            name,
            quantities,
            units,
            ingredients: newIngredients
        });
    };


    return (
        <Wrapper>
            <StyledInput
                placeholder='Section name'
                type='text'
                id={props.sectionState.id}
                value={props.sectionState.name}
                onChange={(e) => handleNameInput(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <ColHeading>Quantity</ColHeading>
                        <ColHeading>Unit</ColHeading>
                        <ColHeading>Ingredient</ColHeading>
                    </tr>
                </thead>
                <tbody>
                    {inputFields.map((input, idx) =>
                        <InputRow
                            key={input}
                            idx={idx}
                            units={props.units}
                            ingredients={props.ingredients}
                            setQuantityInputValues={handleQuantityInputValues}
                            setUnitInputValues={handleUnitInputValues}
                            setIngredientInputValues={handleIngredientInputValues}
                        />)}
                </tbody>
            </table>
            <Container>
                <SectionIcon src={addIcon} onClick={addInput} />
                <SectionIcon src={removeIcon} onClick={removeInput} />
            </Container>
        </Wrapper>
    );
};


export default IngredientsTable;