import React from 'react';

const RepoList = (props) => {
  return (
    <div>
    <h4> Repo List Component </h4>
    {props.repos.map((repo,index) => {
      return (
         <tbody key={index}>
           <tr>
             <td>{repo.login}</td>
             <td>{repo.repo_name}</td>
             <td><a href={repo.repos_url} >{repo.repos_url}</a></td>
             <td>{repo.avatar_url}</td>
           </tr>
        </tbody>
      );
    })}
    </div>
  );
}

export default RepoList;



