import React, { Component } from 'react';
import UserContext from './Context';
import Axios from 'axios';
import * as utils from './Utils/user';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null,
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
        document.cookie = 'auth-token= ; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.setState({
            loggedIn: false,
            user: null
        });
    };

    componentDidMount() {

        const token = utils.getCookieByName('auth-token')

        if (!token) {
            this.logOut();
            return;
        }


        Axios.post('http://localhost:5000/api/verifylogin',
            { token: token }
        ).then((res) => {
            const { _id, email, role, firstName, lastName, profilePicUrl } = res.data;
            this.logIn({
                _id,
                email,
                role,
                firstName,
                lastName,
                profilePicUrl
            })
        }).catch((err) => {
            this.logOut();
        })

    }

    render() {

        if (this.state.loggedIn === null) {
            return (<div>Loading...</div>)
        }

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