import React from 'react';
import axios from 'axios';

export default class IngredientComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: []
        };
    }

    componentDidMount() {
        axios.get('/ingredient/all')
            .then((res) => {
                this.setState({ ingredients: res.data })
            })
    }

    render() {
        return (
            <ul>
                {this.state.ingredients.map((ingredient) => {
                    return <li key={ingredient._id}>{ingredient.name}</li>
                })}
            </ul>
        );
    }
}