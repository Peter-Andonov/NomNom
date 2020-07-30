import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import UserContext from './Context';
import HomePage from './Pages/Home-page';
import LoginPage from './Pages/Login-page';
import RegisterPage from './Pages/Register-page';
import AdminPage from './Pages/Admin-page';
import CreateRecipePage from './Pages/Create-recipe-page';
import CreateIngredientPage from './Pages/Create-ingredient-page';
import CreateArticlePage from './Pages/Create-article-page';
import CreateUnitPage from './Pages/Create-unit-page';


class Navigation extends Component {

  static contextType = UserContext;

  render() {
    return (
      <Router>
        <Switch>
          <Route path={'/'} exact component={HomePage} />
          <Route path={'/login'} component={LoginPage} />
          <Route path={'/register'} component={RegisterPage} />
          <Route path={'/admin'} component={AdminPage} />
          <Route path={'/create/recipe'} component={CreateRecipePage} />
          <Route path={'/create/ingredient'} component={CreateIngredientPage} />
          <Route path={'/create/article'} component={CreateArticlePage} />
          <Route path={'/create/unit'} component={CreateUnitPage} />
        </Switch>
      </Router>
    );
  };
};

export default Navigation;
