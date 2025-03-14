import React, { Fragment } from 'react';
import './LeftNav.css';

function LeftNav({ files, groups, onFileSelect, onUserSelect }) {
  const renderFiles = files?.map(file => {
    return (
      <li
        key={file.id}
        onClick={() => onFileSelect(file)}
      >
        {file.name}
      </li>
    );
  });

  const userInGroup = () => {
    
  }

  const renderGroups = groups.map(group => {
    return (
      <Fragment key={group.id}><h3>Group {group.id}</h3>
      <ul>
        {group.users.map(user => <li onClick={() => onUserSelect(user)} key={user.id}>{user.name}</li>)}
      </ul>
      </Fragment>
    );
  });

  return (
    <div className="left-nav-container">
      <div className='left-nav'>
      {renderGroups}
      <h3>Files</h3>
      <ul>
      {renderFiles}
      </ul>
      </div>
    </div>
  );
}

export default LeftNav;
