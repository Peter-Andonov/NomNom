import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import HomePage from './Pages/Home-page';
import LoginPage from './Pages/Login-page';
import RegisterPage from './Pages/Register-page';
import AdminPage from './Pages/Admin-page';


const Navigation = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/'} exact component={HomePage} />
        <Route path={'/login'} component={LoginPage} />
        <Route path={'/register'} component={RegisterPage} />
        <Route path={'/admin'} component={AdminPage} />
      </Switch>
    </Router>
  );
}

export default Navigation;
