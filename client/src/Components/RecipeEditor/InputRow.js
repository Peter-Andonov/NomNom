import React from 'react';


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
                <input onChange={setQuantityInput} type='number' />
            </td>
            <td>
                <select defaultValue={""} onChange={setUnitInput}>
                    <option value="" hidden >Select Unit</option>
                    {unitOptions}
                </select>
            </td>
            <td>
                <select defaultValue={""} onChange={setIngredientInput}>
                    <option value="" hidden >Select Ingredient</option>
                    {ingredientOptions}
                </select>
            </td>
        </tr>
    );
};

export default InputRow;