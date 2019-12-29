import React, {Fragment, Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/layouts/Search'
import Alert from './components/layouts/Alert'
import About from './components/pages/About'
import axios from 'axios'
import './App.css';

class App extends Component{

  state = ({
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  })

  async componentDidMount() {
    this.setState({loading: true})

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`)

    this.setState({users: res.data, loading: false})

  }
  //searching users
  userSearch = async text =>{
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`)   
    this.setState({users: res.data.items, loading: false})                          
  }

  //Get singlr user details
  getUser = async username => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`)   
    this.setState({user: res.data, loading: false})
  }

  //Get Users Repos
  getUserRepos = async username => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`)   
    this.setState({repos: res.data, loading: false})
  }

  //clearing users
  userClear = () => this.setState({users: [], loading: false})

  //setAlert function
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}})
    
    setTimeout(()=>{
      this.setState({alert: null})
    }, 3000)
  }

  render(){
    return(
      <Router>
        <div>
          <Navbar />
          <div className="container">
          <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props=>(
                <Fragment>
                  <Search userSearch={this.userSearch} 
                          userClear={this.userClear} 
                          showClear={this.state.users.length > 0 ? true : false}
                          setAlert={this.setAlert}/>
                  <Users loading={this.state.loading} 
                          users={this.state.users}/>
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={this.state.repos} user={this.state.user} loading={this.state.loading} />
              )} />
            </Switch>
            
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
