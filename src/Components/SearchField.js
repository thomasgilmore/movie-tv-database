import React from 'react';

export default function SearchField() {
    const searchDatabase = (e) => {
        e.preventDefault();
        let inputValue = document.getElementById('searchField').value;
        console.log(inputValue);
    };
    return (
        <div>
            <form id="form">
                <input type="text" placeholder="Search Movies or TV Shows..." id="searchField"></input>
                <button type="submit" onClick={searchDatabase}>Search</button>
            </form>
        </div>
    )
}
