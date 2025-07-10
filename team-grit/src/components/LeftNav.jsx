import React, { Fragment } from 'react';
import './LeftNav.css';

function LeftNav({ files, groups, onFileSelect, onUserSelect, currentUser, selectedFile, selectedUser }) {

  const userInGroup = (group) => {
    const groupUserIds = group.users.map(user => user.id);
    return groupUserIds.includes(currentUser.id);
  }

  // only show groups the user is in (unless isTeacher)
  const renderGroups = groups
  .filter(group => currentUser.role === "teacher" || userInGroup(group)) // Only show the group the user is in unless they're a teacher
  .map(group => (
    <Fragment key={group.id}>
      <h3>Group {group.id}</h3>
      <ul>
        {group.users.map(user => (
          // onUserSelect -- we want to show files selected user has submitted
          <li 
            onClick={() => onUserSelect(user)} 
            key={user.id}
            className={selectedUser && selectedUser.id === user.id ? 'selected' : ''}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </Fragment>
  ));

  const renderFiles = files?.length > 0 
  ? files.map(file => (
      <li 
        key={file.id} 
        onClick={() => onFileSelect(file)}
        className={selectedFile && selectedFile.id === file.id ? 'selected' : ''}
      >
        Submission {file.submission}, file name: {file.name}
      </li>
    ))
  : null;

  

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
