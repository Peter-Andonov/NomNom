import React from 'react';
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
    justify-content: left;
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

    const initialRows = props.sectionState.ingredients.map((ingr, idx) => `input-${idx}`);

    const handleNameInput = (value) => {
        const { _id, quantities, units, ingredients } = { ...props.sectionState };
        const newName = value;
        props.handleInput({
            _id,
            name: newName,
            quantities,
            units,
            ingredients
        });
    };

    const handleQuantityInputValues = (value, idx) => {
        const { _id, name, quantities, units, ingredients } = { ...props.sectionState };
        const newQuantities = [...quantities];
        newQuantities[idx] = value;
        props.handleInput({
            _id,
            name,
            quantities: newQuantities,
            units,
            ingredients
        });
    };

    const handleUnitInputValues = (value, idx) => {
        const { _id, name, quantities, units, ingredients } = { ...props.sectionState };
        const newUnits = [...units];
        newUnits[idx] = value;
        props.handleInput({
            _id,
            name,
            quantities,
            units: newUnits,
            ingredients
        });
    };

    const handleIngredientInputValues = (value, idx) => {
        const { _id, name, quantities, units, ingredients } = { ...props.sectionState };
        const newIngredients = [...ingredients];
        newIngredients[idx] = value;
        props.handleInput({
            _id,
            name,
            quantities,
            units,
            ingredients: newIngredients
        });
    };

    const addRow = () => {
        props.addInputRow(props.idx);
    };

    const removeRow = () => {
        props.removeInputRow(props.idx);
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
                    {initialRows.map((input, idx) =>
                        <InputRow
                            key={input}
                            idx={idx}
                            quantityValue={props.sectionState.quantities[idx]}
                            unitValue={props.sectionState.units[idx] ? props.sectionState.units[idx]._id : ''}
                            ingredientValue={props.sectionState.ingredients[idx] ? props.sectionState.ingredients[idx]._id : ''}
                            units={props.units}
                            ingredients={props.ingredients}
                            setQuantityInputValues={handleQuantityInputValues}
                            setUnitInputValues={handleUnitInputValues}
                            setIngredientInputValues={handleIngredientInputValues}
                        />)}
                </tbody>
            </table>
            <Container>
                <SectionIcon src={addIcon} onClick={addRow} />
                <SectionIcon src={removeIcon} onClick={removeRow} />
            </Container>
        </Wrapper>
    );
};


export default IngredientsTable;