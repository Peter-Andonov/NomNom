import React, { Component } from 'react';
import UserContext from '../../Context';
import styled from 'styled-components';
import ProfileNav from './ProfileNav';
import Dropdown from './Dropdown';
import StyledLink from './Link';


const Head = styled.header`
    top: 0;
    width: 100%;
    height: 100px;
    position: fixed;
    background-image: linear-gradient(rgba(0,0,0, .9),rgba(245,245,220, 0));
`;

const Navigation = styled.nav`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Spacer = styled.div`
    flex: 1;
`;

class Header extends Component {

    static contextType = UserContext;

    render() {
        return (
            <Head>
                <Navigation>
                    <StyledLink to={'/'} text={'Home'} />
                    <StyledLink to={'/recipes'} text={'Recipes'} />
                    <StyledLink to={'/articles'} text={'Articles'} />
                    <Spacer />
                    {!this.context.loggedIn &&
                        <div>
                            <StyledLink to={'/login'} text={'Login'} />
                            <StyledLink to={'/register'} text={'Register'} />
                        </div>}
                    {this.context.loggedIn &&
                        <ProfileNav>
                            <Dropdown />
                        </ProfileNav>}
                </Navigation>
            </Head>
        );
    };
};


export default Header;