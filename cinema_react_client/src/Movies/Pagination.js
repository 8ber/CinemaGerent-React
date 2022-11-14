import React from 'react'
import './MoviesNavbarComp.css'
function Pagination({ moviesPerPage, totalMovies, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <footer className="Pagination">
            {pageNumbers.map(number => (
                <li key={number}>
                    <a href="#" onClick={() => paginate(number)}>{number}</a>
                </li>
            ))}
        </footer>
    )
}

export default Pagination