import React from 'react'

export default class Seach extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      name: ""
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearch(event){
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.search(this.state.name)
    this.setState({
      name: ""
    })
  }

  render(){
    return(
      <form className="form-group" onSubmit={this.handleSubmit}>
        <input 
        type="text"
        placeholder="Search Movie"
        id="name"
        name="name"
        value={this.state.name}
        onChange={this.handleSearch}
        />
        <button type="button" className="btn btn-warning" onClick={this.handleSubmit}>Seach</button>
      </form>
    )
  }
}