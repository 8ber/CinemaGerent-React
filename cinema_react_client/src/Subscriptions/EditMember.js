import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editMember } from '../redux/appReducer';
import api from '../utils/Data'

function EditMember() {

    const storeData = useSelector(state => state.appReducer.data.dataFromApi)
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem("token"));

    const getMemberInfoToEdit = useCallback(async () => {
        let id = params.id;
        var member = await storeData.members.find(mem => mem._id === id)
        return member;
    }, [params.id, storeData.members])

    const sendDataToServer = async () => {
        //sending an api post req - to edit the member
        let response = await api.putMember({ _id: memID, name: name, city: city, email: email }, token)
        if (response.status === 200) 
        {
            //edit the member data in the redux global store
            dispatch(editMember({ _id: memID, name: name, city: city, email: email }));
            navigate("/subscriptions/all")
        }
    }


    useEffect(() => {
        getMemberInfoToEdit().then(mem => {
            setName(mem.name)
            setEmail(mem.email)
            setCity(mem.city)
            setMemID(mem._id)
        })
    }, [getMemberInfoToEdit])

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [memID, setMemID] = useState("")

    return (
        <div>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            City: <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            <br />
            <button onClick={sendDataToServer}>Save</button>
            <button onClick={() => { navigate("/subscriptions/all") }}>Cancel</button>
        </div>)
}

export default EditMember

