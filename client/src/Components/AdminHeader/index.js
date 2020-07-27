import React, { Component } from 'react';
import UserContext from '../../Context';
import styled from 'styled-components';
import ProfileNav from '../UserHeader/ProfileNav';
import Dropdown from '../UserHeader/Dropdown';
import StyledLink from '../UserHeader/Link';


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

class AdminHeader extends Component {

    static contextType = UserContext;

    render() {
        return (
            <Head>
                <Navigation>
                    <StyledLink to={'/'} text={'Home'} />
                    <StyledLink to={'/create/recipe'} text={'Create Recipe'} />
                    <StyledLink to={'/create/article'} text={'Create Article'} />
                    <StyledLink to={'/create/ingredient'} text={'Create Ingredient'} />
                    <StyledLink to={'/create/unit'} text={'Create Unit'} />
                    <Spacer />
                    {this.context.loggedIn &&
                        <ProfileNav>
                            <Dropdown />
                        </ProfileNav>}
                </Navigation>
            </Head>
        );
    };
};

export default AdminHeader;