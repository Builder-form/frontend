import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../lib/axios";
import './styles.css'

export const Account = () =>{
    const [data, setData] = useState({
        first_name:'',
        last_name:'',
        username:'',
        phone_number:'',
    })
    
    const queried = useRef(false);

    useEffect(()=>{
        if (!queried.current) {
           queried.current = true;
           
           userApi.get('user_self_info/').then((r) =>{
                setData(r.data)
            }).catch((r)=>navigate('/login'))
        }
    })

    let navigate = useNavigate()

    return <div className="accountPage">
        <div className="goToProjects" onClick={()=>navigate('/')}>Go to  projects</div>
        <div className="accountCard">
                <div className="accountCardInfo">
                    <div className="accountCardInfoHeader">Account</div>
                    <div>First Name: {data.first_name}</div>
                    <div>Last Name: {data.last_name}</div>
                    <div>E-mail: {data.username}</div>
                    <div>Phone number: {data.phone_number}</div>
                    <Button type="primary" onClick={()=>navigate('/register')} size="large">Change</Button>
                </div>
                <img src='/pictures/cards.svg'></img>
            </div>
        </div>
}