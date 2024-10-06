import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ActionsContext } from '../context/ActionsContextProvider'
import { SelectedSpriteContext } from '../context/SelectedSpriteContextProvider';

const Canvas = ({ onActionSelect }) => {
  const { positions, setPositions, rotations, setRotations } = useContext(ActionsContext);
  const { selectedSprite } = useContext(SelectedSpriteContext);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlocks, setSelectedBlocks] = useState(new Set());

  // Function to execute actions for the selected sprite
  const handleExecuteActions = (actions) => {
    if (!selectedSprite || actions.length === 0) return; // Exit if no sprite is selected or no actions available

    const newPositions = { ...positions };
    const newRotations = { ...rotations };

    // Initialize position and rotation for the selected sprite if not already present
    if (!newPositions[selectedSprite]) {
      newPositions[selectedSprite] = { x: 0, y: 0 };
    }
    if (!newRotations[selectedSprite]) {
      newRotations[selectedSprite] = 0;
    }

    actions.forEach((action) => {
      switch (action) {
        case 'Move 10 steps':
          newPositions[selectedSprite].x += 10;
          break;

        case 'Turn 15 degrees':
          newRotations[selectedSprite] += 15;
          break;

        // Handling 'Go to x:10 to y:40'
        default:
          if (action.startsWith('Go to x:')) {
            const regex = /Go to x:(-?\d+)\s*to\s*y[:=](-?\d+)/; // Regular expression to capture x and y values with 'to' format
            const match = action.match(regex); // Match the action string with the regex
            if (match) {
              const [, x, y] = match; // Extract x and y from the match result
              newPositions[selectedSprite].x = parseInt(x, 10); // Set the x position
              newPositions[selectedSprite].y = parseInt(y, 10); // Set the y position
            } else {
              console.error('Failed to parse the "Go to" action:', action);
            }
          } else {
            console.log(`Executing unknown action: ${action}`);
          }
          break;
      }
    });

    setPositions(newPositions);
    setRotations(newRotations);
  };

  // Handle block drop
  const handleDrop = (event) => {
    event.preventDefault();
    const action = event.dataTransfer.getData('text/plain');
    setBlocks((prevBlocks) => [...prevBlocks, action]);
  };

  // Handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Handle block click (select or deselect)
  const handleBlockClick = (block) => {
    const newSelectedBlocks = new Set(selectedBlocks);

    if (newSelectedBlocks.has(block)) {
      newSelectedBlocks.delete(block); // Deselect if already selected
    } else {
      newSelectedBlocks.add(block); // Select block
    }

    setSelectedBlocks(newSelectedBlocks);
  };

  // Handle block deletion
  const handleDelete = (block) => {
    setBlocks((prevBlocks) => prevBlocks.filter((b) => b !== block)); // Remove the block
    const newSelectedBlocks = new Set(selectedBlocks);
    newSelectedBlocks.delete(block); // Deselect if it was selected
    setSelectedBlocks(newSelectedBlocks);
  };

  // Execute the selected blocks
  const executeActions = () => {
    const groupedActions = Array.from(selectedBlocks);
    if (groupedActions.length > 0) {
      handleExecuteActions(groupedActions);
    }
  };

  return (
    <div
      className="canvas bg-gray-100 w-3/4 p-4 m-4 border-dashed border-2 border-gray-400 h-full flex flex-col items-center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="text-center">Canvas</h2>
      <div className="flex flex-col items-center mt-4">
        {blocks.length > 0 ? (
          blocks.map((block, index) => (
            <motion.div
              key={index}
              className={`bg-blue-400 text-white w-64 py-2 mb-2 rounded-md shadow-md flex justify-between items-center cursor-pointer transition-transform transform-gpu ${selectedBlocks.has(block) ? 'border border-blue-500' : ''}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleBlockClick(block)}
            >
              <div className="flex items-center w-full">
                <input
                  type="checkbox"
                  checked={selectedBlocks.has(block)}
                  readOnly
                  className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer"
                />
                <span className="text-center ml-2">{block}</span>
                <button onClick={() => handleDelete(block)} className="text-red-500 ml-2">
                  🗑️
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-gray-600 italic">Drop your blocks here!</div>
        )}
      </div>
      <button
        className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={executeActions}
        disabled={selectedBlocks.size === 0}
      >
        Execute Actions
      </button>
    </div>
  );
};

export default Canvas;
