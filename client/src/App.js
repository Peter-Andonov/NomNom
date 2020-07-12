import React from 'react';
import './App.css';
import Header from './Components/Header'
import Navbar from './Components/Navigation'
import RecipeList from './Components/RecipeList'

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <RecipeList />
    </div>
  );
}

export default App;
