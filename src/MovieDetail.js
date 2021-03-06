/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Poster } from './Movie';
import Overdrive from 'react-overdrive';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  state = {
    movie: {},
  }

  async componentDidMount() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=58cb30722b0c1eb592fd297cfa637c39&language=en-US`);
      const movie = await res.json();
      this.setState({
        movie,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movie } = this.state;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={movie.id}>
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
          </Overdrive>
          <div>
            {this.state.movie.title ? (
              <h1>{movie.title}</h1>
            ) : (
              <i>A title is not currently available for this film.</i>
            )}
            {this.state.movie.release_date ? (
              <h3>{movie.release_date}</h3>
            ) : (
              <i>A release date is not currently available for this film.</i>
            )}
            {this.state.movie.overview ? (
              <p>{movie.overview}</p>
            ) : (
              <i>An overview is not available for this film.</i>
            )}
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;

const MovieWrapper = styled.div`
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
  padding-top: 50vh;
  position: relative;
`;

const MovieInfo = styled.div`
  background: #fff;
  display: flex;
  padding: 2rem 10%;
  text-align: left;
  > div {
    margin-left: 20px;
  }
  img {
    position: rleative;
    top: -5rem;
  }
`;
