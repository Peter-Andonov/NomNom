import React from 'react'
import styles from './index.module.css'

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className={styles['nav-item']}>
                <a href={this.props.href} className={styles['nav-link']}>
                    {this.props.icon}
                    <span className={styles['link-text']}>{this.props.text}</span>
                </a>
            </li>
        );
    }
}