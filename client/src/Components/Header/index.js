import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from '../../Context';
import styled from 'styled-components';
import ProfileNav from './ProfileNav';
import AdminNav from './AdminNav';
import Dropdown from './Dropdown';
import StyledLink from './Link';
import TextItem from './TextItem';


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

const Header = () => {

    const userContext = useContext(UserContext);
    const history = useHistory();
    const isAdmin = userContext.user ? userContext.user.role === 'admin' : false;

    const logOut = (e) => {
        userContext.logOut();
        history.push('/');
    };


    return (
        <Head>
            <Navigation>
                <StyledLink to={'/'} text={'Home'} />
                <StyledLink to={'/recipes'} text={'Recipes'} />
                <StyledLink to={'/ingredients'} text={'Ingredients'} />
                <StyledLink to={'/articles'} text={'Articles'} />
                {isAdmin &&
                    <AdminNav >
                        <Dropdown>
                            <StyledLink to={'/admin'} text={'Dashboard'} />
                            <StyledLink to={'/create/recipe'} text={'Create Recipe'} />
                            <StyledLink to={'/create/ingredient'} text={'Create Ingredient'} />
                            <StyledLink to={'/create/article'} text={'Create Article'} />
                            <StyledLink to={'/create/unit'} text={'Create Unit'} />
                        </Dropdown>
                    </AdminNav>}
                <Spacer />
                {!userContext.loggedIn &&
                    <div>
                        <StyledLink to={'/login'} text={'Login'} />
                        <StyledLink to={'/register'} text={'Register'} />
                    </div>}
                {userContext.loggedIn &&
                    <ProfileNav>
                        <Dropdown>
                            {!isAdmin && <StyledLink to={'/favourites'} text={'Favourites'} />}
                            <StyledLink to={`/profile`} text={'Profile'} />
                            <TextItem action={logOut} label={'Logout'} />
                        </Dropdown>
                    </ProfileNav>}
            </Navigation>
        </Head>
    );
};


export default Header;