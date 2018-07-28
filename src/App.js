import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import Movie from './Movie';

class App extends Component {
  
  state = {
    movies:[]
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=58cb30722b0c1eb592fd297cfa637c39&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
      const movies = await res.json();
      this.setState({
        movies: movies.results
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const movies = this.state.movies;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
        </header>
        {movies.map( movie => <Movie key={movie.id} movie={movie} /> )}
      </div>
    );
  }
}

export default App;
