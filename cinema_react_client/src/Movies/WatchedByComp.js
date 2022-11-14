import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function WatchedByComp(props) {
  
  // props include:
  //1.movie ID
  //redux supplies:
  //1.Subscriptons list
  //2.members list
  //output needed: MemberName, Date watched.

  const [data, setData] = useState("")
  const storeData = useSelector(state => state.appReducer.data.dataFromApi)

  const filterWatchedMovies = useCallback(async () => {
    let Results = [];
    for (let sub of storeData.subscriptions) 
    {
      //an array contains objects like so - { movieid, date }
      let whenWatched = await sub.movies.filter(mov => mov.movieid === props.movieID).map(movie => movie.date)
      if (whenWatched.length > 0)
      {
      //object with member info
      var whoWathced = await storeData.members.find(member => member._id === sub.memberid)
      Results.push({ when: whenWatched, who: whoWathced.name })
      }
    }
    return Results;
  }, [props.movieID,storeData.members,storeData.subscriptions])

  useEffect(() => {
      filterWatchedMovies().then(namesNdates => {
      setData(namesNdates)
    });
  }, [filterWatchedMovies])

  return (
    <div style={{ display: "inline-block" }}>
      {
        data && data.map((item,i)=>{
          return <React.Fragment key={i}>
            <Link to={`/subscriptions/all?member=${item.who}`} alt="Edit user">{item.who}</Link>, {item.when[0].slice(0,10).split("-").reverse().join("-")}
            <br />
          </React.Fragment>
        })
      }
    </div>
  )
}

export default WatchedByComp