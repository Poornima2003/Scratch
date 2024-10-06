import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'; 
import Canvas from './components/Canvas'; 
import Sprites from './components/Sprite'; 
import ChooseSprite from './components/ChooseSpirte'; 

const App = () => {
  const [selectedSprites, setSelectedSprites] = useState([]);
  const [actions, setActions] = useState({}); 

  const addSprite = (sprite) => {
    setSelectedSprites((prev) => [...prev, sprite]);
  };

  const handleActionSelect = (selectedAction) => {
    setActions((prevActions) => [...prevActions, ...selectedAction]);
  };

  const handleDeleteSprite = (spriteId) => {
    setSelectedSprites((prev) => prev.filter(sprite => sprite.id !== spriteId)); 
  };

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <Canvas 
          onActionSelect={handleActionSelect} 
        />
        <Routes>
          <Route 
            path="/" 
            element={<Sprites selectedSprites={selectedSprites} actions={actions} handleDeleteSprite={handleDeleteSprite} setSelectedSprites={setSelectedSprites} />} 
          />
          <Route 
            path="/choose-sprite" 
            element={<ChooseSprite addSprite={addSprite} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;