const apiKey='ef213728'

let movieCardEl=document.querySelector('.movie-card')

let searchTermEl=document.getElementById('search-term')

let searchBtn=document.getElementById('search-btn')

searchBtn.addEventListener('click', searchForMovieData)

searchTermEl.addEventListener('keydown', function(event){
    if(event.key=='Enter')
    {
        searchForMovieData()
    }
})

//on first load, display 'welcome' movie's data
getMovieData('welcome')

function searchForMovieData()
{
    movieCardEl.style.display='none'

    movieCardEl.innerText=""

    const movieName=searchTermEl.value.trim()

    searchTermEl.value=""
    
    if(movieName=="")
        return
    
    getMovieData(movieName)
    
}


async function getMovieData(movieName)
{
    const url=`https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`

    try{
        const response=await fetch(url)

        if(!response.ok)
        {
            throw new Error("Request error! Couldnt fetch data")
        }

        const data=await response.json()

        console.log("data has been fetched")

        console.log(data)

        displayMovieData(data)
    }

    catch(error)
    {
        displayError(error)
    }
}


function displayMovieData(data)
{
    const{Title,Year,Runtime,Genre,Plot,Poster,Director,Actors}=data

    const {Ratings:[{Value:imdbRating}]}=data

    console.log(imdbRating)

    movieCardEl.style.display='flex'

    let posterEl=document.createElement('img')
    posterEl.src=`${Poster}`
    posterEl.classList.add('poster-display')
    movieCardEl.append(posterEl)

    let titleEl=document.createElement('h1')
    titleEl.innerText=`${Title}`
    titleEl.classList.add('title-display')
    movieCardEl.append(titleEl)

    let yearAndRuntimeEl=document.createElement('div')
    yearAndRuntimeEl.innerHTML=`<p>${Year}</p><p>${Runtime}</p>`
    yearAndRuntimeEl.classList.add('year-and-runtime-display')
    movieCardEl.append(yearAndRuntimeEl)

    let imdbRatingEl=document.createElement('p')
    imdbRatingEl.innerText=`IMDB: ${imdbRating}`
    imdbRatingEl.classList.add('imdb-rating-display')
    movieCardEl.append(imdbRatingEl)

    let genreEl=document.createElement('p')
    genreEl.innerText=`${Genre}`
    genreEl.classList.add('genre-display')
    movieCardEl.append(genreEl)

    let plotEl=document.createElement('p')
    plotEl.innerText=`"${Plot}"`
    plotEl.classList.add('plot-display')
    movieCardEl.append(plotEl)


    if(Director!='N/A')
    {
        let directorEl=document.createElement('p')
        directorEl.innerHTML=`<span>Director: </span>${Director}`
        directorEl.classList.add('director-display')
        movieCardEl.append(directorEl)
    }

    let actorsEl=document.createElement('p')
    actorsEl.innerHTML=`<span>Actors: </span>${Actors}`
    actorsEl.classList.add('actors-display')
    movieCardEl.append(actorsEl)
 
}


function displayError(error)
{
    console.error(error)

    movieCardEl.style.display='flex'

    movieCardEl.innerText="Please enter a valid movie name!"

    
}