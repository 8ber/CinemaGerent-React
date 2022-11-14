import React from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import './SubscriptionCard.css'
import EditDeleteComp from './EditDeleteComp'
import WatchedByComp from './WatchedByComp'
export default function SubscriptionsComp() {
    //the component listens to the redux storeData
    //it renders SubscriptionCard component via props inside a main div (a flexbox)
    const storeData = useSelector(state => state.appReducer.data)
    const [searchParams, setSearchParams] = useSearchParams();
    const searchKey = searchParams.get('member') || ''
    const searchLogic = (e) => {
        const member = e.target.value;
        if (member) setSearchParams({ member })
        else setSearchParams({})
    }
    return (
        <>
            Find member: <input type="search" placeholder="Member name..." onChange={searchLogic} value={searchKey} />

            <div className="MainDiv">
                {
                    storeData.dataFromApi.members.filter(mem =>
                        mem.name.toLowerCase().includes(searchKey.toLowerCase())).map((member, index) => {
                        return (
                            <React.Fragment key={index}>
                                <MemberCard member={member} />
                            </React.Fragment>)
                    })
                }
            </div>
        </>
    )
}

export function MemberCard(props) {
    return (<div className="MemberCard">
        <strong>
            {props.member.name}
        </strong>
        <br />
        {props.member.email}
        <br />
        [{props.member.city}]
        <EditDeleteComp memberID={props.member._id} />
        <br />
        <div className="WhoWatched">
            <WatchedByComp memberID={props.member._id} />
        </div>
    </div>)
}