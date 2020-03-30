import React from 'react';

export const RepoItem = ({repo}) => {
  return (
    <div className="card">
      <a className="" href={repo.html_url}>{repo.name}</a>
    </div>
  )
}