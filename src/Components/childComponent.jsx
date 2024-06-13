import React from 'react';

const ChildComponent = ({ component, updateParent }) => {
  const addChild = (parentIndex, orientation) => {
    const newComponent = { id: Date.now(), orientation, children: [] };
    const updatedComponent = { ...component };
    const parent = findComponent(updatedComponent, parentIndex);
    parent.children.push(newComponent);
    updateParent(updatedComponent);
  };

  const findComponent = (parent, id) => {
    if (parent.id === id) return parent;
    for (const child of parent.children) {
      const result = findComponent(child, id);
      if (result) return result;
    }
    return null;
  };

  return (
    <div className={`child-component ${component.orientation}`}>
      <button onClick={() => addChild(component.id, 'horizontal')}>Horizontal</button>
      <button onClick={() => addChild(component.id, 'vertical')}>Vertical</button>
      <div className={`nested-children ${component.orientation}`}>
        {component.children.map((child) => (
          <ChildComponent
            key={child.id}
            component={child}
            updateParent={(updatedChild) => {
              const parent = findComponent(component, child.id);
              parent.children = updatedChild.children;
              updateParent(component);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChildComponent;
