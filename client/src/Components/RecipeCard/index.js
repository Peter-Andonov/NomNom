import React from 'react';
import styles from './index.module.css';
import matcha from '../../Images/matcha.jpg';

export default class RecipeCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={styles['card']}>
                <img className={styles['card-img']} src={matcha} alt='Recipe'/>
                <h4 className={styles['card-title']} >Green matcha</h4>
                <table className={styles['table']}>
                    <tr>
                        <td>
                            <div className={styles['table-header']} >Prep time</div>
                            <div className={styles['table-value']} >30 min</div>
                        </td>
                        <td>
                            <div className={styles['table-header']} >Cook time</div>
                            <div className={styles['table-value']} >20 min</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles['table-header']} >Serves</div>
                            <div className={styles['table-value']} >6</div>
                        </td>
                        <td>
                            <div className={styles['table-header']} >Difficulty</div>
                            <div className={styles['table-value']} >Medium</div>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}