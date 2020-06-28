import React, { Component } from 'react';
import MovieRow from './MovieRow';
import $ from 'jquery';

export class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {}

        this.performSearch()
    }

    performSearch(searchTerm) {
        console.log("Perform search using moviedb")
        const urlString = "https://api.themoviedb.org/3/search/movie?api_key=526997861292b1a02c339135a7a20843&query=" + searchTerm;
        $.ajax({
          url: urlString,
          success: (searchResults) => {
            console.log("Fetched data successfully")
            console.log(searchResults)
            const results = searchResults.results
            // console.log(results[0])
    
            var movieRows = []
    
            results.forEach((movie) => {
              movie.poster_src = "https://image.tmdb.org/t/p/w440_and_h660_face" + movie.poster_path;
              console.log(movie.title)
              const movieRow = <MovieRow key={movie.id} movie={movie} />
              movieRows.push(movieRow)
            })
    
            this.setState({rows: movieRows})
          },
          error: (xhr, status, err) => {
            console.log("Failed to fetch data")
          }
        })
      }
    
      searchChangeHandler(event) {
        console.log(event.target.value);
        const boundObject = this
        const searchTerm = event.target.value;
        boundObject.performSearch(searchTerm);
      }
    
      render() {
      return (
        <div>
          
          <table className="titleBar">
            <tbody>
              <tr>
                <td>
                  <img alt="app icon" width="50" src="https://www.themoviedb.org/assets/1/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg" />
                </td>
                <td width="8"></td>
                <td>
                  <h1>MovieDB Search</h1>
                </td>
              </tr>
            </tbody>
          </table>
    
          <input style={{
            fontSize: 24,
            display: 'block',
            width: '99%',
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16
          }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term" />
    
          {this.state.rows}
            
    
        </div>
      );
      }

}