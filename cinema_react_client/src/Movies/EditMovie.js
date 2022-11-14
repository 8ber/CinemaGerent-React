import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateMovie } from '../redux/appReducer';
import api from '../utils/Data'


function EditMovie() {

    const storeData = useSelector(state => state.appReducer.data.dataFromApi)

    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem("token"));

    const getMovieInfoToEdit = useCallback(async () => {
        let id = params.id;
        var movie = await storeData.movies.find(mov => mov._id === id)
        return movie;
    }, [params.id, storeData.movies])

    const sendDataToServer = async () => {
        //converting input fields data - to match the DB format
        let premiered = new Date(moviePremiered).toISOString();

        // console.log({ _id: movieID, name: movieName, image: movieImage, genres: movieGenres, premiered: premiered })

        //sending an api post req - to add the new movie data
        let response = await api.updateMovie({ _id: movieID, name: movieName, image: movieImage, genres: movieGenres, premiered: premiered }, token)
        if (response.status === 200) {
            //add the new movie data to the redux global store
            dispatch(updateMovie({ _id: movieID, name: movieName, image: movieImage, genres: movieGenres, premiered: premiered }));
            navigate("/movies/all")
        } }


        useEffect(() => {
            getMovieInfoToEdit().then(mov => {
                setMovieName(mov.name)
                setMovieGenres(mov.genres)
                setMovieImage(mov.image)
                setMoviePremiered(mov.premiered.slice(0, 10))
                setMovieID(mov._id)
            })
        }, [getMovieInfoToEdit])


        const [movieName, setMovieName] = useState("")
        const [movieGenres, setMovieGenres] = useState("")
        const [movieImage, setMovieImage] = useState("")
        const [moviePremiered, setMoviePremiered] = useState("")
        const [movieID, setMovieID] = useState("")

        return (
            <div>Name: <input type="text" value={movieName} onChange={(e) => setMovieName(e.target.value)} />
                <br />
                Genres: <input type="text" value={movieGenres} onChange={(e) => setMovieGenres(e.target.value)} />
                <br />
                image url: <input type="text" value={movieImage} onChange={(e) => setMovieImage(e.target.value)} />
                <br />
                Premiered: <input type="date" value={moviePremiered} onChange={(e) => setMoviePremiered(e.target.value)} />
                <br />
                <button onClick={sendDataToServer}>Save</button>
                <button onClick={() => { navigate("/movies/all") }}>Cancel</button>
            </div>)
    }

    export default EditMovie

