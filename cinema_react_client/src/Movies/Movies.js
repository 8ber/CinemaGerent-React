import React, { useState } from 'react'
import Pagination from './Pagination'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import './MovieCard.css'
import EditDeleteComp from './EditDeleteComp'
import WatchedByComp from './WatchedByComp'
export default function MoviesComp() {
    //the component listens to the redux storeData
    //it renders MovieCard component via props inside a main div (a flexbox)
    const storeData = useSelector(state => state.appReducer.data)
    const [searchParams, setSearchParams] = useSearchParams();
    const searchKey = searchParams.get('movie') || ''
    const searchLogic = (e) => {
        const movie = e.target.value;
        if (movie) {
            setCurrentPage(1);
            setSearchParams({ movie })
        }
        else setSearchParams({})
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(12);
    //get current number of movies in a page
    const indexOfTheLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfTheLastMovie - moviesPerPage;

    //actual change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [totalMovies, setTotalMovies] = useState(storeData.dataFromApi.movies.length)
    return (
        <>
            Find movie: <input type="search" placeholder="Movie name..." onChange={searchLogic} value={searchKey} />

            <div className="MainDiv">
                {
                    moviesFilterd(storeData, searchKey, indexOfFirstMovie, indexOfTheLastMovie)
                }
            </div>
            <Pagination moviesPerPage={moviesPerPage}
                totalMovies={totalMovies}
                paginate={paginate} />
        </>
    )
}

function moviesFilterd(storeData, searchKey, indexOfFirstMovie, indexOfTheLastMovie) {
    let stas = storeData.dataFromApi.movies.filter((movie) => movie.name.toLowerCase().includes(searchKey.toLowerCase())
    ).slice(indexOfFirstMovie, indexOfTheLastMovie).map((movie, index) => {
        return (
            <React.Fragment key={index}>
                <MovieCard data={movie} index={index} />
            </React.Fragment>)
    })
    
}

export function MovieCard(props) {
    return (<div className="MovieCard">
        <strong>
            {props.data.name}
        </strong>
        <br />
        {props.data.premiered.slice(0, 10).split("-").reverse().join("-")}
        <br />
        [{props.data.genres.join(', ')}]
        <EditDeleteComp movieID={props.data._id} />
        <hr />
        <div className="WatchedAndImage">
            <img className="Cardimg" alt={props.data.name} src={props.data.image} />
            <WatchedByComp movieID={props.data._id} />
        </div>
    </div>)
}