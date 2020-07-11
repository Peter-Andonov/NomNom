import React from 'react';
import './App.css';
import IngredientComponentTest from './IngredientComponentTest'
import Navbar from './Components/Navigation'
import RecipeList from './Components/RecipeList'

function App() {
  return (
    <div className="App">
      <Navbar />
      <RecipeList />
    </div>
  );
}

export default App;
