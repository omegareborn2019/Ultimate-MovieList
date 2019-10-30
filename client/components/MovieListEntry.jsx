import React from 'react';

export default class MovieListEntry extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      status: this.props.status,
      display: false
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.handleToggleStatus = this.handleToggleStatus.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  handleRemove(){
    this.props.remove(this.props.name);
  }

  handleToggleStatus(){
    this.setState({
      status: !this.state.status
    })
    this.props.toggleMovieStatus(this.props.id);
  }

  toggleDisplay(){
    this.setState({
      display: !this.state.display
    })
  }

  render(){
    let result;
    if (this.state.display){
      result = (
        <div className="card">
          <li className="list-group-item">{this.props.name}</li>
          <div className="card-body">
            <img src="https://m.media-amazon.com/images/M/MV5BOGE2YWUzMDItNTg2Ny00NTUzLTlmZGYtNWMyNzVjMjQ3MThkXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg" className="card-img-top"></img>
            <p className="card-text">Release Date: {this.props.release_date}</p>
            <p className="card-text">IMDB Rating: {this.props.vote_average}</p>
            <p className="card-text">Popularity: {this.props.popularity}</p>
          </div>
          <button type="button" className="btn btn-danger" onClick={this.toggleDisplay}>Return</button>
          <button
          type="button" 
          className="btn btn-success"
          onClick={this.handleToggleStatus}
          >
          {this.state.status ? "Watched": "To Watch"}
          </button>
        </div>
      )
    }else{
      result = (
      <div>
        <li className="list-group-item" onClick={this.toggleDisplay}>{this.props.name}</li>
        <button type="button" className="btn btn-danger" onClick={this.handleRemove}>X</button>
        <button 
        type="button" 
        className="btn btn-success"
        onClick={this.handleToggleStatus}
        >
        {this.state.status ? "Watched": "To Watch"}
        </button>
      </div>
      )
    }
    return result;
  }
}