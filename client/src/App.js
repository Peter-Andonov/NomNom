import React from 'react';
import './App.css';
import Header from './Components/Header';
import Navbar from './Components/Navigation';
import RecipeList from './Components/RecipeList';
import ImageUploader from './Components/ImageUploader';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <ImageUploader />
    </div>
  );
}

export default App;
