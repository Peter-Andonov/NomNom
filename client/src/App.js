import React, { Component } from 'react';
import UserContext from './Context';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: null
        };
    };

    logIn = (user) => {
        this.setState({
            loggedIn: true,
            user: user
        });
    };

    logOut = () => {
        this.setState({
            loggedIn: false,
            user: null
        })
    }

    render() {
        return (
            <UserContext.Provider value={{
                loggedIn: this.state.loggedIn,
                user: this.state.user,
                logIn: this.logIn,
                logOut: this.logOut
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    };
};

export default App;