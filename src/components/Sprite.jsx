import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { ActionsContext } from '../context/ActionsContextProvider';
import { SelectedSpriteContext } from '../context/SelectedSpriteContextProvider';

import Cat from '../assets/cat.svg';
import Girl from '../assets/girl.svg';
import Balloon from '../assets/balloon.svg';
import Ball from '../assets/ball.svg';

const spriteImages = {
  Cat: Cat,
  Ball: Ball,
  Girl: Girl,
  Balloon: Balloon,
};

const Sprite = ({ selectedSprites = [], setSelectedSprites }) => {
  const history = useNavigate();
  const { positions, setPositions, rotations, setRotations} = useContext(ActionsContext);
  const { selectedSprite, setSelectedSprite } = useContext(SelectedSpriteContext);
 

  const handleDragEnd = (event, info, sprite) => {
    console.log('handleDragEnd called');
    
    const newX = info.point.x - animationAreaRef.current.getBoundingClientRect().left;
    const newY = info.point.y - animationAreaRef.current.getBoundingClientRect().top;

    setPositions((prev) => ({
      ...prev,
      [sprite]: { x: newX, y: newY },
    }));
    
  };

  const handlePositionChange = (axis, value) => {

    console.log('handleposition called');
    if (!selectedSprite) return;

    const newPositions = { ...positions };
    if (!newPositions[selectedSprite]) {
      newPositions[selectedSprite] = { x: 0, y: 0 };
    }
    newPositions[selectedSprite][axis] = value;
    setPositions(newPositions);

  };

  const handleRotationChange = (value) => {
    if (!selectedSprite) return;

    setRotations((prevRotations) => ({
      ...prevRotations,
      [selectedSprite]: value,
    }));
    
  };

  const handleDeleteSprite = (index) => {
    const spriteToDelete = selectedSprites[index];

    setSelectedSprites((prev) => prev.filter((_, i) => i !== index));

    const newPositions = { ...positions };
    const newRotations = { ...rotations };

    delete newPositions[spriteToDelete];
    delete newRotations[spriteToDelete];

    if (selectedSprite === spriteToDelete) {
      setSelectedSprite(null);
    }

    setPositions(newPositions);
    setRotations(newRotations);
  };

  const handleSpriteClick = (sprite) => {
    setSelectedSprite(sprite);
  };

  
  return (
    <div className="flex flex-col w-full h-full">
      <div  className='flex-grow flex items-center justify-center border border-gray-300 bg-white-50 relative'>
        {selectedSprites.length > 0 ? (
          selectedSprites.map((sprite) => (
            <motion.div
              key={sprite} 
              className="sprite absolute"
              style={{
                left: `${positions[sprite]?.x}px`,
                top: `${positions[sprite]?.y}px`,
                width: '100px',
                height: '80px',
              }}
              drag
              dragMomentum={false}
              onDragEnd={(event, info) => handleDragEnd(event, info, sprite)}
              animate={{
                x: positions[sprite]?.x,
                y: positions[sprite]?.y,
                rotate: rotations[sprite] || 0,
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src={spriteImages[sprite]} alt={sprite} />
            </motion.div>
          ))
        ) : (
          <div className="text-gray-600 italic">No sprites selected!</div>
        )}
      </div>

      <div className="h-1/2 p-4 bg-white border-t border-gray-300 shadow-md rounded-t-lg overflow-y-auto">
        <h3 className="text-center text-lg font-semibold mb-4">Choose a Sprite</h3>
        <div className="flex justify-between mb-2">
          <div className="flex flex-col">
            <label className="text-gray-600">X Position:</label>
            <input
              type="number"
              value={positions[selectedSprite]?.x || 0}
              onChange={(e) => handlePositionChange('x', Number(e.target.value))}
              className="border border-gray-300 rounded p-1 w-20"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Y Position:</label>
            <input
              type="number"
              value={positions[selectedSprite]?.y || 0}
              onChange={(e) => handlePositionChange('y', Number(e.target.value))}
              className="border border-gray-300 rounded p-1 w-20"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Direction:</label>
            <input
              type="number"
              value={rotations[selectedSprite] || 0}
              onChange={(e) => handleRotationChange(Number(e.target.value))}
              className="border border-gray-300 rounded p-1 w-20"
            />
          </div>
        </div>

        <div className="flex gap-5">
          {selectedSprites.map((sprite, index) => (
            <div key={sprite} className={`border border-gray-300 rounded-lg p-2 shadow flex justify-center items-center w-20
              ${selectedSprite === sprite ? 'bg-blue-100' : 'bg-white-100'}`}
            >
              <div className="flex justify-between items-center">
                <span
                  className="cursor-pointer"
                  onClick={() => handleSpriteClick(sprite)}
                >
                  <img
                    src={spriteImages[sprite]} 
                    alt={sprite}
                    width={'50px'}
                    height={'30px'}
                  />
                </span>
                <button onClick={() => handleDeleteSprite(index)} className={`${selectedSprite === sprite ? 'block' : 'hidden'}`}>
                  <FaTrash className="text-red-500 hover:text-red-700" aria-label="Delete sprite" />
                </button>
              </div>
            </div>
          ))}
        </div>

 

        <button
          className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
          onClick={() => history('/choose-sprite')}
          aria-label="Choose sprite"
        >
          🐱
        </button>
      </div>
    </div>
  );
};

export default Sprite;
