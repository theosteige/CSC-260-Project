import React from 'react';

function ClassList({ classes, onSelectClass }) {
  return (
    <ul>
      {classes.map(cls => (
        <li 
          key={cls.id} 
          onClick={() => onSelectClass(cls.id)}
          style={{ cursor: 'pointer' }}
        >
          {cls.name}
        </li>
      ))}
    </ul>
  );
}

export default ClassList;
