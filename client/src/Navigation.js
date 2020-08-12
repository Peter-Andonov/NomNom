import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserContext from './Context';
import HomePage from './Pages/Home-page';
import RecipesPage from './Pages/Recipes-page';
import IngredientsPage from './Pages/Ingredients-page';
import ArticlesPage from './Pages/Articles-page';
import RecipeDetailsPage from './Pages/Recipe-details-page';
import IngredientDetailsPage from './Pages/Ingredient-details-page';
import ArticleDetailsPage from './Pages/Article-details-page';
import LoginPage from './Pages/Login-page';
import RegisterPage from './Pages/Register-page';
import ProfilePage from './Pages/Profile-page';
import FavouritesPage from './Pages/Favourites-page';
import AdminPage from './Pages/Admin-page';
import CreateRecipePage from './Pages/Create-recipe-page';
import CreateIngredientPage from './Pages/Create-ingredient-page';
import CreateArticlePage from './Pages/Create-article-page';
import CreateUnitPage from './Pages/Create-unit-page';
import EditRecipePage from './Pages/Edit-recipe-page';
import EditIngredientPage from './Pages/Edit-ingredient-page';
import EditArticlePage from './Pages/Edit-article-page';
import EditUnitPage from './Pages/Edit-unit-page'



const Navigation = () => {

  const userContext = useContext(UserContext);
  const isLoggedIn = userContext.loggedIn;
  const isAdmin = userContext.user ? userContext.user.role === 'admin' : false;

  return (
    <Router>
      <Switch>
        <Route path={'/'} exact component={HomePage} />
        <Route path={'/recipes'} component={RecipesPage} />
        <Route path={'/recipe/:id'} component={RecipeDetailsPage} />
        <Route path={'/ingredients'} component={IngredientsPage} />
        <Route path={'/ingredient/:id'} component={IngredientDetailsPage} />
        <Route path={'/articles'} component={ArticlesPage} />
        <Route path={'/article/:id'} component={ArticleDetailsPage} />
        <Route path={'/login'} >
          {isLoggedIn ? (<Redirect to={'/'} />) : (<LoginPage />)}
        </Route>
        <Route path={'/register'} >
          {isLoggedIn ? (<Redirect to={'/'} />) : (<RegisterPage />)}
        </Route>
        <Route path={'/profile'} >
          {isLoggedIn ? (<ProfilePage />) : (<Redirect to={'/'} />)}
        </Route>
        <Route path={'/favourites'} >
          {isLoggedIn ? (<FavouritesPage />) : (<Redirect to={'/'} />)}
        </Route>
        <Route path={'/admin'} >
          {isAdmin ? (<AdminPage />) : (<Redirect to={'/'} />)}
        </Route>
        <Route path={'/create/recipe'} >
          {isAdmin ? (<CreateRecipePage />) : (<Redirect to={'/'} />)}
        </Route>
        <Route path={'/create/ingredient'} >
          {isAdmin ? (<CreateIngredientPage />) : (<Redirect to={'/'} />)}
        </Route>
        <Route path={'/create/article'} >
          {isAdmin ? (<CreateArticlePage />) : (<Redirect to={'/'} />)}
        </Route>
        <Route path={'/create/unit'} >
          {isAdmin ? (<CreateUnitPage />) : (<Redirect to={'/'} />)}
        </Route>
        <Route path={'/edit/recipe/:id'} >
          {isAdmin ? (<EditRecipePage />) : (<Redirect to={'/'} />)}
        </Route>
        <Route path={'/edit/ingredient/:id'} >
          {isAdmin ? (<EditIngredientPage />) : (<Redirect to={'/'} />)}
        </Route>
        <Route path={'/edit/article/:id'} >
          {isAdmin ? (<EditArticlePage />) : (<Redirect to={'/'} />)}
        </Route>
        <Route path={'/edit/unit/:id'} >
          {isAdmin ? (<EditUnitPage />) : (<Redirect to={'/'} />)}
        </Route>
      </Switch>
    </Router>
  );
};

export default Navigation;