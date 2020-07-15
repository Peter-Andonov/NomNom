import React from 'react';
import styles from './index.module.css';
import { ReactComponent as CookieLogo } from '../../Images/Icons/cookie-bite-solid.svg';
import avatar from '../../Images/avatar.jpg';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className={styles['header']}>
                <ul className={styles['header-ul']}>
                    <li className={styles['logo']}>
                        <a href='/' className={styles['logo-link']} >
                            <CookieLogo className={styles['logo-svg']} />
                            <span className={styles['logo-text']}>NomNom</span>
                        </a>
                    </li>

                    <li className={styles['spacer']}></li>

                    <li className={styles['header-item']}>
                        <a href='/' className={styles['header-link']}>
                        <span className={styles['link-text']}>Login</span>
                        </a>
                    </li>

                    <li className={styles['header-item']}>
                        <a href='/' className={styles['header-link']}>
                        <span className={styles['link-text']}>Register</span>
                        </a>
                    </li>

                    <li className={styles['header-item']}>
                        <a href='/' className={styles['header-link']}>
                        <img className={styles['profile-pic']} src={avatar} alt='Avatar'/>
                        <span className={styles['link-text']}>Test user</span>
                        </a>
                    </li>
                </ul>
            </header>
        );
    }
}