
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { GrClose } from 'react-icons/gr'; 


import Cat from '../assets/cat.svg';
import Girl from '../assets/girl.svg';
import Ball from '../assets/ball.svg';
import Balloon from '../assets/balloon.svg';

const ChooseSprite = ({ addSprite }) => {
  const navigate = useNavigate(); 

  
  const sprites = [
    { name: 'Cat', image: Cat },
    { name: 'Girl', image: Girl },
    { name: 'Ball', image: Ball },
    { name: 'Balloon', image: Balloon }
  ];

  const handleCrossClick = () => {
    navigate(-1);
  };

  const handleSpriteClick = (sprite) => {
    addSprite(sprite.name); 
    navigate('/'); 
  };

  return (
    <div className="choose-sprite bg-white p-4 h-full relative transition-all duration-300 ease-in-out">
      <button 
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 focus:outline-none"
        onClick={handleCrossClick}
      >
        <GrClose className="text-2xl" />
      </button>
      <h2 className="text-center text-lg font-bold">Choose a Sprite</h2>
      <div className="sprite-list grid grid-cols-2 gap-4 mt-4">
        {sprites.map((sprite, index) => (
          <div 
            key={index}
            className="sprite-item bg-gray-200 p-4 rounded text-center cursor-pointer hover:bg-gray-300 transition-colors duration-200"
            onClick={() => handleSpriteClick(sprite)} 
          >
            <img src={sprite.image} alt={sprite.name} className="w-16 h-16 mx-auto mb-2" /> 
            <span>{sprite.name}</span> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseSprite;
