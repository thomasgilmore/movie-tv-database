import React from 'react';

export class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        inputValue: ''
      };
      this.removeSpaces = (text) => {
        return text.split(' ').filter(e => e.trim().length).join('%20');
      };
      this.fetchDatabase = () => {
        let searchText = this.removeSpaces(this.inputValue);
        console.log(searchText);
        fetch("https://api.themoviedb.org/3/search/multi?api_key=526997861292b1a02c339135a7a20843&language=en-US&query=" + searchText + "&page=1&include_adult=false")
          .then(res => res.json())
          .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.results
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
      }
      this.searchDatabase = (e) => {
        e.preventDefault();
        this.inputValue = document.getElementById('searchField').value;
        // console.log(this.inputValue);
        // console.log(this.removeSpaces(this.inputValue));
        document.getElementById('searchField').value = '';
        this.fetchDatabase();
        this.componentDidUpdate();
    };
    }

    // componentDidMount() {
      
    // }

    componentDidUpdate() {
      console.log(this.state.items);
    }
  
    // componentDidUpdate() {
    //   let searchText = this.removeSpaces(this.inputValue);
    //   console.log(searchText);
    //   fetch("https://api.themoviedb.org/3/search/multi?api_key=526997861292b1a02c339135a7a20843&language=en-US&query=" + searchText + "&page=1&include_adult=false")
    //     .then(res => res.json())
    //     .then(
    //       (result) => {
    //         this.setState({
    //           isLoaded: true,
    //           items: result.results
    //         });
    //       },
    //       // Note: it's important to handle errors here
    //       // instead of a catch() block so that we don't swallow
    //       // exceptions from actual bugs in components.
    //       (error) => {
    //         this.setState({
    //           isLoaded: true,
    //           error
    //         });
    //       }
    //     )
    // }
  
    render() {
      const { error, isLoaded, items } = this.state;
      console.log(items);
      if (error) {
        return <div>Error: {error.message}</div>;
      // } else if (!isLoaded) {
      //   return <div>Loading...</div>;
      } else {
        return (
            <div>
              <form id="form">
                <input type="text" placeholder="Search Movies or TV Shows..." id="searchField"></input>
                <button type="submit" onClick={this.searchDatabase}>Search</button>
              </form>
              {items.length > 0 ? items[0].original_name  : ''}
            </div>
        //   <ul>
        //     {items.map(item => (
        //       <li key={item.name}>
        //         {item.name} {item.price}
        //       </li>
        //     ))}
        //   </ul>
        );
      }
    }
  }