import React from 'react';
import NavItem from './NavItem';

import { ReactComponent as FavouritesIcon } from '../../Images/Icons/favourite.svg';
import { ReactComponent as RecipesIcon} from '../../Images/Icons/recipes_book.svg';
import { ReactComponent as MeditationIcon } from '../../Images/Icons/meditation.svg';

import styles from './index.module.css';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className={styles['navbar']}>
                <ul className={styles['navbar-ul']}>
                    <NavItem href="/" icon={<FavouritesIcon />} text={"Favourites"}/>
                    <NavItem href="/" icon={<RecipesIcon />} text={"Recipes"}/>
                    <NavItem href="/" icon={<MeditationIcon />} text={"Articles"}/>
                </ul>
            </nav>
        );
    }
}