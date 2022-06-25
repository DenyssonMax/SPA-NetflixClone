import movieTrailer from 'movie-trailer';
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player';
import { getMovies } from '../api';
import "./Row.css"

const imageHost = "https://image.tmdb.org/t/p/original/";
function Row({title, path, isLarge}) {
    //state - guarda o stado e facilitar a renderização
    const [movies, setMovies] = React.useState([]);
    const [trailerUrl, setTrailerUrl] = React.useState("")
    const handleOnClick = (movie) => {
        //pega url do trailler 
        if (trailerUrl){
            setTrailerUrl("")
        }else{
            movieTrailer(movie.name || movie.title || movie.original.name || "").then((url) => {
                 setTrailerUrl (url);
            })
            .catch((error) => {
                console.log("Error fetching movie trailler: ", error);
            })
        }
    
    }

    const fetchMovies = async (_path) => {
        try{
            const data = await getMovies(_path);
            console.log("data ", data);
            setMovies(data?.results);
        } catch (error) {
            console.log("fetchMovies error: ", error)
        }
    };
    //testecommit
    useEffect(() => {
      fetchMovies(path);
    }, [path]);
    
    return (
        <div className="row-container">
            <h2 className="row-header">{title}</h2>
            <div className="row-cards">
                {movies?.map(movie => {
                    return (
                         <img 
                         className={`movie-card ${isLarge && "movie-card-large"}`}
                         onClick= {() => handleOnClick(movie)}
                         key={movie.id} 
                         src={`${imageHost}${
                            isLarge ? movie.backdrop_path : movie.poster_path}`}
                          alt={movie.name}
                          ></img> 
                    )
                })}
                
            </div>
            {trailerUrl && <ReactPlayer url={trailerUrl} playing={true}/>}
        </div>   
    )
}

export default Row 