import React from 'react'
import uuid from 'uuid/v4'

export default class NewMovieForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {name: ""}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault();
    // add an id attribute everytime we create a movie object
    this.props.create({...this.state, id: uuid(), status: false})
    this.setState({
      name: ""
    })
  }

  render(){
    return(
      // add movie input
      <form className="form-group" onSubmit={this.handleSubmit}>
        <input 
        type="text"
        placeholder="Add New Movie"
        id="name"
        name="name"
        value={this.state.name}
        onChange={this.handleChange}
         />
         <button type="button" className="btn btn-info" onClick={this.handleSubmit}>Add</button>
      </form>
    )
  }
}