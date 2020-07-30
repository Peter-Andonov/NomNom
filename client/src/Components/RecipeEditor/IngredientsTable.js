import React, { Component } from 'react';
import InputRow from './InputRow';
import styled from 'styled-components';


const Table = styled.table`
    margin-bottom: 10rem;
`


class IngredientsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sectionName: '',
            inputs: ['input-0'],
            quantityInputValues: [],
            unitInputValues: [],
            ingredientInputValues: [],
        }
    };

    setInputs = (newInput) => {
        const prevState = this.state.inputs;
        this.setState({
            inputs: [...prevState, newInput]
        })
    };

    addInput = () => {
        const newInput = `input-${this.state.inputs.length}`;
        this.setInputs(newInput);
    };

    removeInput = () => {

        if (this.state.inputs.length === 1) {
            return;
        }

        const inputsArray = [...this.state.inputs];
        inputsArray.splice((inputsArray.length - 1), 1);
        this.setState({
            inputs: inputsArray
        })
    };

    setQuantityInputValues = (value, idx) => {
        const quantityInputs = [...this.state.quantityInputValues];
        quantityInputs[idx] = value;
        this.setState({
            quantityInputValues: quantityInputs
        });
    };

    setUnitInputValues = (value, idx) => {
        const unitInputs = [...this.state.unitInputValues];
        unitInputs[idx] = value;
        this.setState({
            unitInputValues: unitInputs
        });
    };

    setIngredientInputValues = (value, idx) => {
        const ingredientInputs = [...this.state.ingredientInputValues];
        ingredientInputs[idx] = value;
        this.setState({
            ingredientInputValues: ingredientInputs
        });
    };

    render() {
        console.log(this.state.quantityInputValues, 
            this.state.unitInputValues, 
            this.state.ingredientInputValues,
            this.props.units)

        return (
            <div>
                <button onClick={this.addInput}>Add input</button>
                <button onClick={this.removeInput}>Remove input</button>
                <Table>
                    <thead>
                        <tr>
                            <td>Quantity</td>
                            <td>Unit</td>
                            <td>Ingredient</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.inputs.map((input, idx) =>
                            <InputRow
                                key={input}
                                idx={idx}
                                units={this.props.units}
                                setQuantityInputValues={this.setQuantityInputValues}
                                setUnitInputValues={this.setUnitInputValues}
                                setIngredientInputValues={this.setIngredientInputValues}
                            />)}
                    </tbody>
                </Table>
            </div>
        );
    };
};

export default IngredientsTable;