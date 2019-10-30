import React from 'react'

export default class Navigation extends React.Component{
  constructor(props){
    super(props);
    this.handleWatched = this.handleWatched.bind(this);
    this.handleToWatch = this.handleToWatch.bind(this);
  }

  handleWatched(){
    this.props.toggleWatched()
  }

  handleToWatch(){
    this.props.toggleToWatch()
  }

  render(){
    return(
      <div>
        <button 
        type="button" 
        className="btn btn-primary"
        onClick={this.handleToWatch}
        >To Watch
        </button>
        <button 
        type="button" 
        className="btn btn-dark"
        onClick={this.handleWatched}
        >Watched</button>
      </div>
    )
  }
}