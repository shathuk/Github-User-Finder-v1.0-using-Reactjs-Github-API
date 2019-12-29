import React, { Component } from 'react'

export class Search extends Component {

    state={
        text: ''
    }

    //onSubmit form function
    onSubmit = (event) => {
        event.preventDefault()

        if(this.state.text===''){
            this.props.setAlert('Please enter somethig!', 'light')
        }else{
            this.props.userSearch(this.state.text);
            this.setState({text: ''})
        }     
    }

    //onchange function for text
    onChange = (e) => this.setState({text: e.target.value})
    
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" value={this.state.text} onChange={this.onChange} placeholder="Search users..."/>
                    <input type="submit" value="search" className="btn btn-dark btn-block"/>
                </form>
                {this.props.showClear && <button className="btn btn-light btn-block" onClick={this.props.userClear}>Clear</button>}
                
                
            </div>
        )
    }
}

export default Search

