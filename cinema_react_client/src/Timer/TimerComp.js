import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { timeElapsed } from '../redux/appReducer'

function TimerComp(props) {
  //adding a dispatch hook to the reducer
  const dispatch = useDispatch();

  //login time in miliseconds pulled from localStorage:
  var savedLoginTime = new Date(JSON.parse(localStorage.getItem("time"))).getTime();
  //the user session allowance (in minutes):
  var UserSessionTimeOut = props.sessiontimeout * 60000
  //calculating the token expiration time:
  var TokenExpirationTime = new Date(savedLoginTime + UserSessionTimeOut);

  //a fucntion to return the time left, till TokenExpirationTime:
  const calculateTimeLeft = () => {
    let difference = +TokenExpirationTime - +new Date();
    let timeLeft = {};

    //the diffrence is in milliseconds, converted to a human readable format:
    if (difference > 0) //means that the timer is still ticking...
    {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    else if (difference < 1000) //No more time left
    {
      dispatch(timeElapsed(true));
    }
    return timeLeft; //output as an object

  }

  //initializing the component state with the excution of the calculateTimeLeft
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  //calling the calculateTimeLeft - every second & updating the state
  var timer = setInterval(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);

  //clearing the timer with its unique ID
  useEffect(() => {
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) { return; }
    if (interval === "seconds")
    {
      timerComponents.push(<span key={interval + " id"}>{timeLeft[interval]}</span>);
    }
    else{
    timerComponents.push(
      <span key={interval + " id"}>
        {timeLeft[interval]}{":"}
        </span>);}
  });

  return (
    <div>
      {timerComponents.length ? <>{timerComponents} till session times out.</> : null}
    </div>
  )
}

export default TimerComp;