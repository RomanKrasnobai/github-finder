import React from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner';

const Users = ({users, loading}) => {
  const UserStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem',
  };

  if (loading) {
    return <Spinner />
  } else {
    return (
      <div style={UserStyles}>
        {users.map(user => (
          <UserItem key={user.id} users={user} />
        ))}
      </div>
    )
  }
};

export default Users
