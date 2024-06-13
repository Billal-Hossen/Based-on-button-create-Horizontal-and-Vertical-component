import React, { useState } from 'react';
import './App.css';
import ChildComponent from './Components/childComponent';


function App() {
  const [children, setChildren] = useState([]);

  const addChild = (orientation) => {
    const newChild = { id: Date.now(), orientation, children: [] };
    setChildren([...children, newChild]);
  };

  const updateChildren = (updatedChild) => {
    const updatedChildren = children.map((child) =>
      child.id === updatedChild.id ? updatedChild : child
    );
    setChildren(updatedChildren);
  };

  return (
    <div className="App">
      <div className="initial-buttons">
        <button onClick={() => addChild('horizontal')}>Horizontal</button>
        <button onClick={() => addChild('vertical')}>Vertical</button>
        {
          children.length > 0 && <div className="children-container">
            {children.map((child) => (
              <ChildComponent
                key={child.id}
                component={child}
                updateParent={updateChildren}
              />
            ))}
          </div>
        }
      </div>

    </div>
  );
}

export default App;
