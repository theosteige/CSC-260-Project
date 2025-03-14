import React, { Fragment } from 'react';
import './LeftNav.css';

function LeftNav({ files, groups, onFileSelect, onUserSelect, currentUser }) {
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

  const userInGroup = (group) => {
    const groupUserIds = group.users.map(user => user.id);
    return groupUserIds.includes(currentUser.id);
  }

  const renderGroups = groups.map(group => {
    return (
      <Fragment key={group.id}><h3>Group {group.id}</h3>
      <ul>
        {(userInGroup(group) || currentUser.role === 'teacher') && group.users.map(user => <li onClick={() => onUserSelect(user)} key={user.id}>{user.name}</li>)}
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
