import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import UserContext from '../../Context';


const TestSetup = (props) => {
    return(
        <BrowserRouter>
            <Route>
                <UserContext.Provider value={props.value}>
                    {props.children}
                </UserContext.Provider>
            </Route>
        </BrowserRouter>
    );
};


export default TestSetup;