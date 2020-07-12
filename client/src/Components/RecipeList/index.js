import React from 'react';
import styles from './index.module.css';

import RecipeCard from '../RecipeCard';

export default class RecipeList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className={styles.main}>
                <h1>Recipes</h1>
                <div className={styles.container}>
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                </div>
            </main>
        );
    }
}