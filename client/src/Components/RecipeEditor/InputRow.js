import React from 'react';
import styled from 'styled-components';


const StyledInput = styled.input`
    font-size: 1.2rem;
    width: 5rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 2px solid black;
`;

const StyledSelect = styled.select`
    font-size: 1.2rem;
    width: 12rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 2px solid black;
`;

const InputRow = (props) => {

    const setQuantityInput = (e) => {
        props.setQuantityInputValues(e.target.value, props.idx);
    }

    const setUnitInput = (e) => {
        props.setUnitInputValues(e.target.value, props.idx);
    }

    const setIngredientInput = (e) => {
        props.setIngredientInputValues(e.target.value, props.idx);
    }

    const unitOptions = props.units.map((unit) => <option key={unit._id} value={unit._id} >{unit.name}</option>)

    const ingredientOptions = props.ingredients.map((ingredient) => <option key={ingredient._id} value={ingredient._id} >{ingredient.name}</option>)

    return (
        
        <tr>
            <td>
                <StyledInput value={props.quantityValue} onChange={setQuantityInput} type='number' />
            </td>
            <td>
                <StyledSelect value={props.unitValue} onChange={setUnitInput}>
                    <option value="" hidden >Select Unit</option>
                    {unitOptions}
                </StyledSelect>
            </td>
            <td>
                <StyledSelect value={props.ingredientValue} onChange={setIngredientInput}>
                    <option value="" hidden >Select Ingredient</option>
                    {ingredientOptions}
                </StyledSelect>
            </td>
        </tr>
    );
};

export default InputRow;