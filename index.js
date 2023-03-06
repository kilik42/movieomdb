let movieNameRef = document.getElementById("movie-name");
let searchBtnRef = document.getElementById("search-btn");
let result = document.getElementById("result");

import config from './config.js';

const apiKey = config.API_KEY;
// function to fetch data from api

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;
    // if input is empty
    if (movieName.length <= 0) {
            result.innerHTML = `<h3 class = "msg">please Enter a movie name</h1>`;

    } else {

            fetch(url).then((resp) => resp.json()).then((data) => {
                console.log(data);
                if (data.Response == "True") {
                    result.innerHTML = `
                        <div class="info">
                            <img src=${data.Poster} class="poster">
                            <div>
                                <h2>${data.Title}</h2>
                                <div class="rating">
                                    
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class="details">
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class="genre">
                                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                                </div>
                            </div>
                        </div>
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                        <h3>Cast:</h3>
                        <p>${data.Actors}</p>
                    `;
                }
    
                //if movie doesn't exist in database
                else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
     .catch(() =>{
        result.innerHTML = `<h3 class = "msg">Something went wrong</h1>`;
     })
  }
}

searchBtnRef.addEventListener("click", getMovie);
window.addEventListener("load", (e) => {
    if (e.key == "Enter") {
        getMovie();
    }
});