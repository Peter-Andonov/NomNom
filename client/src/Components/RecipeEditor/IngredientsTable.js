import React, { useState } from 'react';
import InputRow from './InputRow';
import styled from 'styled-components';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
            <input
                placeholder='Section name'
                type='text'
                id={props.sectionState.id}
                value={props.sectionState.name}
                onChange={(e) => handleNameInput(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <td>Quantity</td>
                        <td>Unit</td>
                        <td>Ingredient</td>
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
            <button onClick={addInput}>Add input</button>
            <button onClick={removeInput}>Remove input</button>
        </Wrapper>
    );
};


export default IngredientsTable;