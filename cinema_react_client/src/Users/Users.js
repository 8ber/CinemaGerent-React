import React from 'react'
import { useSelector } from 'react-redux'
import './UserCard.css'
import EditDeleteComp from './EditDeleteComp'
export default function MoviesComp() {
    //the component listens to the redux storeData
    //it renders UserCard component via props inside a main div (a flexbox)
    const users = useSelector(state => state.appReducer.data.dataFromApi.users)
    return (
            <div className="MainDiv">
                {
                    users.map((user, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <UserCard data={user} />
                                </React.Fragment>)
                        })
                }
            </div>
    )
}

export function UserCard(props) {
    return (<div className="UserCard">
        <EditDeleteComp id={props.data.id}/><br />
        <label>Name</label>: {props.data.firstname + " " + props.data.lastname}
        
        <br />
        <label>UserName</label>: {props.data.username}
        <br />
        <label>Session time out (minutes)</label>: {props.data.sessiontimeout}
            <br />
            <label>Created date</label>: <input readOnly type="date" value={props.data.created_at} />
            <br />
            <label>Permissions</label>: <br />
            {
                props.data.permissions.map((per,i)=>{
                    return <React.Fragment key={i}>{per}<br /></React.Fragment>
                })
            }
            
    </div>)
}