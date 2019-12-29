import React from 'react'

const RepoItem = ({repo}) => {
    return (
        
        <div>
            
            <a className="my-4" href={repo.html_url} >{repo.name}</a>
        </div>
    )
}

export default RepoItem
