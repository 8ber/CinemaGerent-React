import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateSubscription, createSubscription } from '../redux/appReducer';
import api from '../utils/Data'
function WatchedByComp(props) {

  // props include:
  //1.memberID

  //redux supplies:
  //1.Subscriptons list
  //2.movies list
  //output needed: list of links to the movies the member watched, and the date he watched them

  //grabbing the token from the localStorage
  const token = JSON.parse(localStorage.getItem("token"));
  //a state to track if user clicked "Add subscription" button
  const [toggle, setToggle] = useState(false)
  //the movies the member has not watched yet
  const [newSubscriptions, SetNewSubscriptions] = useState(null)
  //the movies the member has seen + dates
  const [movies, setMovies] = useState("")
  //listening to the redux store
  const storeData = useSelector(state => state.appReducer.data.dataFromApi)
  //the data needs to be send to the API
  const [movieid, setmovieid] = useState("62e29ab4df1ecd9e54dc96c9")
  const [date, setdate] = useState("")

  const dispatch = useDispatch();

  const addNewSubscription = useCallback(async () => {
    let allMovies = storeData.movies;
    let member = storeData.subscriptions.find(sub => sub.memberid === props.memberID)
    if (member) {
      let moviesMemberSeen = member.movies.map(mov => mov.movieid)
      let moviesNotSeen = allMovies.filter(movie => !moviesMemberSeen.includes(movie._id))
      return moviesNotSeen;
    }
    else {
      return allMovies;
    }
  }, [props.memberID, storeData.movies, storeData.subscriptions])

  const filterWatchedMovies = useCallback(async () => {
    let Results = [];
    let member = storeData.subscriptions.find(sub => sub.memberid === props.memberID);
    if (member)
      member.movies.forEach(movie => {
        let movname = storeData.movies.find(mov => mov._id === movie.movieid)
        let mov = { name: movname.name, date: movie.date }
        Results.push(mov)
      })
    return Results;
  }, [props.memberID, storeData.subscriptions, storeData.movies])

  useEffect(() => {
    filterWatchedMovies().then(data => {
      setMovies(data)
    });
    addNewSubscription().then(data => {
      SetNewSubscriptions(data)
    })
  }, [filterWatchedMovies, addNewSubscription])

  function handleSelectChange(event) {
    setmovieid(event.target.value);
  }


  const SendSubscriptionToServer = async () => {
    let dateISO = new Date(date).toISOString();
    let sub = storeData.subscriptions.find(member => member.memberid === props.memberID)
    if (sub) //there is a sub - send put req - update
    {
      var UpdatedSub = { ...sub }
      UpdatedSub = { ...UpdatedSub, movies: [...UpdatedSub.movies, { movieid: movieid, date: dateISO }] }
      let putResponse = await api.putSubscription(UpdatedSub, token);
      if (putResponse.status === 200) {
        dispatch(updateSubscription({ memberid: props.memberID, movieid: movieid, date: dateISO }))
      }
    }
    else //no sub yet - send post req - create
    {
      var NewSub = {};
      NewSub.memberid = props.memberID;
      NewSub.movies = [{ movieid: movieid, date: dateISO }];
      let postResponse = await api.postSubscription(NewSub, token);
      if (postResponse.status === 200) {
        NewSub._id = postResponse.data
        dispatch(createSubscription(NewSub))
      }
    }
  }

  return (
    <div style={{ display: "inline-block" }}>
      {
        movies && movies.map((movie, i) => {
          return <ul className="WatchedBy" key={i} style={{ listStyle: "square inside" }}>
            <li><Link to={`/movies/all?movie=${movie.name}`.replaceAll(' ', '+')}>{movie.name}</Link>, {movie.date.slice(0, 10).split("-").reverse().join("-")}</li>
            <br />
          </ul>
        })
      }
      <button onClick={() => { setToggle(!toggle) }}>Add subscription</button>
      {
        toggle
          ?
          <>
            <br />Add a new movie: <br />
            <select style={{ width: "100%" }}
              value={movieid}
              onChange={handleSelectChange}>
              {newSubscriptions.map((mov, i) => {
                return (<option value={mov._id} key={i}>
                  {mov.name}
                </option>)
              })}

            </select>,
            <input
              type="date"
              onChange={e => setdate(e.target.value)} />
            <br />
            <button onClick={SendSubscriptionToServer}>Subscribe</button>
          </>
          :
          <></>
      }
    </div>
  )
}

export default WatchedByComp