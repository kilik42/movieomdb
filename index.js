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
                if (data.Response == "False") {
                    result.innerHTML = `<h3 class = "msg">${data.Error}</h1>`;
                } else {
                    result.innerHTML = `<div class = "info">
                    <img src = "${data.Poster}" class="poster" alt = "">   
                    <div class = "movie-info">
                        <h3>${data.Title}</h3>

                            < div class = "rating">

                                    <p>Rating: ${data.imdbRating}</p>
                            </div>
                            <div class = "details">
                                    <p>Released: ${data.Released}</p>
                                    <p>Runtime: ${data.Runtime}</p>
                                    <p>Director: ${data.Director}</p>
                                    
                                    <p>Actors: ${data.Actors}</p>
                                    <p>Language: ${data.Language}</p>
                                    <p>Country: ${data.Country}</p>
                                    <p>Awards: ${data.Awards}</p>
                                    <p>BoxOffice: ${data.BoxOffice}</p>
                                  
                                    <p>Website: ${data.Website}</p>
                                    <p>imdbVotes: ${data.imdbVotes}</p>
                                    
                                    <p>Type: ${data.Type}</p>
                                    
                                    
                                    <p>${data.Year}</p>
                                   
                                    <p>${data.Plot}</p>
                            </div>

                            <div class = "genre">
                                    <p>
                                        Genre: ${data.Genre.split(",").join("</div><div>")}</div>
                                    </p>
                           </div>
                    </div>
                </div>`;
                
     } })
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