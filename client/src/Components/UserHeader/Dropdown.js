import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../Context';
import StyledLink from './Link';


const Container = styled.div`
    position: absolute;
    top: 100px;
    width: auto;
    min-width: 175px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #333333;
    border: 1px solid #474a4d;
    border-radius: 5px;
`;

const Div = styled.div`
    margin: 0.5rem;
    color: white;
    size: 0.8rem;
    &:hover {
        color: rgba(237, 71, 59);
        cursor: pointer;
    }
`

class DropdownMenu extends Component {

    static contextType = UserContext;

    logOut = (e) => {
        this.context.logOut();
        this.props.history.push('/');
    }

    render() {
        return (
            <Container>
                {this.context.user.role === 'admin' && <StyledLink to={'/admin'} text={'Admin'} />}
                {this.context.user.role === 'user' && <StyledLink to={'/favourites'} text={'Favourites'} />}
                <StyledLink to={`/profile/${this.context.user._id}`} text={'Profile'} />
                <Div onClick={this.logOut}>Logout</Div>
            </Container>
        );
    };
};

export default withRouter(DropdownMenu);