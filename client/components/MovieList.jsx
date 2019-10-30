import React from 'react';
import MovieListEntry from './MovieListEntry.jsx';
import NewMovieForm from './NewMovieForm.jsx';
import Search from './Search.jsx';
import NoResult from './NoResult.jsx';
import uuid from 'uuid/v4';
import Navigation from './Navigation.jsx';
import API_KEY from '../../src/config/movie.js'
import $ from 'jquery';


export default class MovieList extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      movies: []
    }
    this.create = this.create.bind(this);
    this.search = this.search.bind(this);
    this.remove = this.remove.bind(this);
    this.toggleToWatch = this.toggleToWatch.bind(this);
    this.toggleWatched = this.toggleWatched.bind(this);
    this.toggleMovieStatus = this.toggleMovieStatus.bind(this);
  }

  componentDidMount() {
   $.ajax({
    url: '/api/movies',
    type: 'GET',
    data: 'json',
    success: (data) => {
      console.log(data);
      this.setState({
        movies: data
      })
    }
   })
  }

  create(newMovie){
    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${newMovie.name}`,
      type: 'GET',
      data: 'json',
      success: (data) => {
        console.log(data.results[0]);
        const newMoviesArr = this.state.movies.slice(0);
        const movieItem = ({
          movieName: data.results[0].title,
          release_date: data.results[0].release_date,
          IMDB: data.results[0].vote_average,
          popularity: data.results[0].popularity,
          status: newMovie.status,
          id: newMovie.id
        })
        newMoviesArr.push(movieItem);
        $.ajax({
          url: "/api/movies", 
          type: "POST", 
          data: movieItem,
          statusCode: {
            200: (data) =>{
              console.log(data);
            },
            400: ()=>{
              alert('error');
            }
          }
        })
        this.setState({
          movies: newMoviesArr
        })
      }
    })
    // this.setState({
    //   movies: [...this.state.movies, newMovie]
    // })
  }

  search(movieName){
    let searchResult = this.state.movies.filter(movie =>{
      return movie.name.toLowerCase() === movieName;
    })
    this.setState({movies: searchResult})
  }

  remove(name){
    this.setState({
      movies: this.state.movies.filter(movie =>{
        return movie.movieName !== name;
      })
    })
    // send a request to the server to delete the data from database
    $.ajax({
      url: "/api/movies",
      type: "DELETE",
      data: {"name": name},
      statusCode: {
        204: ()=>{
          console.log("movie has been deleted");
        },
        400: ()=>{
          console.log("deletion error");
        }
      }
    })
  }

  // movie tabs
  toggleWatched(){
    const watchedResult = this.state.movies.filter(movie =>{
      return movie.status === true
    })
    this.setState({
      movies: watchedResult
    })
  }

  toggleToWatch(){
    const toWatchResult = this.state.movies.filter(movie =>{
      return movie.status === false
    })
    this.setState({
      movies: toWatchResult
    })
  }

  toggleMovieStatus(id){
    const updatedMovie = this.state.movies.map(movie =>{
      if (movie.id === id){
        // if movie's id === the id passed in, we toggle the status
        return {...movie, status: !movie.status}
      }
      return movie;
    })
    this.setState({
      movies: updatedMovie
    })
  }

  render(){
    const movieList = this.state.movies.map(movie =>{
      // need to change movie's properties according to database
      return <MovieListEntry 
      id={movie.id}
      key={movie.id}
      name={movie.movieName}
      status={movie.status}
      remove={this.remove}
      toggleMovieStatus={this.toggleMovieStatus}
      release_date={movie.release_date}
      vote_average={movie.IMDB}
      popularity={movie.popularity}
      />
    })
    return(
      <div className="container">
        <Search search={this.search}/>
        <NewMovieForm create={this.create}/>
        <Navigation toggleWatched={this.toggleWatched} toggleToWatch={this.toggleToWatch} />
        <br/>
        <ul className="list-group">
          {this.state.movies.length ? movieList: <NoResult />}
        </ul>
      </div>
    )
  }
}

// need a watched [] and a watched state;
// toggleMovieStatus function to change movies state;
// need two functions to push watched movies to watched []
// after calling each function, it changes watched state;
// movies [] is the towatch [];
// use conditions to control which movies [] to map;

// insert movies to towatch/original [];
// search movies at current [] by checking watched state;