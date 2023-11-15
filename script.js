const main = document.getElementById("main")
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8face95bdc73f6a46cdc5d2ebde22390&page=1"

const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=8face95bdc73f6a46cdc5d2ebde22390&query="'

let image = ""

const LINK_URL = "https://lookmoviess.com/"
const MOVIE_URL = "movie/"

const form = document.getElementById("form")
const search = document.getElementById("search")

// Get Initial Movies

getMovies(API_URL)

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()

  showMovies(data.results)
}

function showMovies(movies) {
  main.innerHTML = ""

  movies.forEach((movie) => {
    const { id, title, poster_path, vote_average, overview } = movie
    const what_this = `${title}`

    image = `${IMG_PATH + poster_path}`

    const movieEl = document.createElement("div")
    movieEl.classList.add("movie")

    movieEl.innerHTML = `
      <div class="movie">
      <a href="${LINK_URL}" > <img src="${image}" alt="${title}"></a>
           
            <div class="movie-info">
                <h3>Movie Tital</h3>
                <span class="${getClassByRate(vote_average)}">5.3</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${
                  overview + `'<a href="${LINK_URL + MOVIE_URL}">Watch Now</a>'`
                }
            </div>
            
        </div>
      `

    main.appendChild(movieEl)
  })
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green"
  } else if (vote >= 5) {
    return "orange"
  } else {
    return "red"
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm)

    search.value = ""
  } else {
    window.location.reload()
  }
})
