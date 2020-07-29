import React, { Component } from 'react';
import styled from 'styled-components';
import UserContext from '../../Context';
import avatar from '../../Images/avatar.jpg';


const Container = styled.div`
    margin: 1rem;
    color: white;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
`;

    const Avatar = styled.img`
    height: 50%;
    max-height: 4rem;
    border-radius: 50%;
`;

    const Text = styled.span`
    margin-left: 1rem;
`;


class ProfileNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    setOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }

    static contextType = UserContext;
    
    render() {
        return (
            <Container onClick={this.setOpen}>
                <Avatar src={avatar} alt='Avatar' />
                <Text>{this.context.user.email}</Text>
                {this.state.open && this.props.children}
            </Container>
        );
    };
};

export default ProfileNav;