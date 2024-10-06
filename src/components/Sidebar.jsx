
import React from 'react';

const Sidebar = () => {
  const actions = ['Move 10 steps', 'Turn 15 degrees', 'Go to x:10 to y=40'];

  const handleDragStart = (event, action) => {
    event.dataTransfer.setData('text/plain', action); 
  };

  return (
    <div className="sidebar bg-white-300 w-1/4 p-4 h-full border-r border-gray-400">
      <h2 className="text-center text-lg font-bold">Actions</h2>
      <div className="action-blocks mt-4">
        {actions.map((action, index) => (
          <div
            key={index}
            className="action-block bg-blue-400 text-white p-2 mb-2 rounded text-center cursor-pointer hover:bg-blue-500 transition-colors duration-200"
            draggable
            onDragStart={(event) => handleDragStart(event, action)} 
          >
            {action}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
