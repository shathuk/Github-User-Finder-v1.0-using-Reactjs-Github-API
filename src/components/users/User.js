import React, { Fragment, Component } from 'react'
import Spinner from '../layouts/Spinner'
import Repos from '../repos/Repos'
import {Link} from 'react-router-dom'

export class User extends Component {
    componentDidMount(){
        this.props.getUser(this.props.match.params.login)
        this.props.getUserRepos(this.props.match.params.login)
    }
    render() {
        const {
            name,
            company,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            following,
            followers,
            public_repos,
            public_gists,
            hireable,
        } = this.props.user;

        const {loading, repos} = this.props

        if(loading) return <Spinner />

        return (
            <Fragment>
                <Link to="/" className="btn btn-light">Go Back Search</Link>
                Hireable: {hireable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />} 
            
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img src={avatar_url} className='round-img' alt='Avatar' style={{width: '150px'}} />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>   
                    </div>
                    <div>
                        {bio && (<Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>)}
                        <a href={html_url} className="btn btn-dark my-1">Visit GitHub Profile</a>
                        <ul>
                            <li>
                                {login && (<Fragment><p>Username: {login}</p></Fragment>)}
                                {company && (<Fragment><p>Company: {company}</p></Fragment>)}
                                {blog && (<Fragment><p>Website: {blog}</p></Fragment>)}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Followings: {following}</div>
                    <div className="badge badge-light">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>
                <h2>Latest Repos</h2>
                <div className="card">
                    <Repos repos={repos} />
                </div>
            </Fragment>
        )
    }
}

export default User
