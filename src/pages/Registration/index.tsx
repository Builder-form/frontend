import { App, Button, Checkbox, Input } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../lib/axios";
import './styles.css'

export const Registration = () =>{
    const { message, notification, modal } = App.useApp();

    const [data, setData] = useState({
        first_name:'',
        last_name:'',
        username:'',
        phone_number:'',
    })

    const [isNew, setNew] = useState(false)
    const [acceptRules, setAcceptRules] = useState(false)
    const navigate = useNavigate()
    
    
    const queried = useRef(false);
    


    useEffect(()=>{
        if (!queried.current) {
           queried.current = true;
           
           userApi.get('user_self_info/').then((r) =>{
                console.log(r.data)
                if (r.data.first_name == ''){
                    setNew(true)
                } else{
                    setAcceptRules(true)
                }
                setData(r.data)
            }).catch((r)=>navigate('/login'))
        }
    })



    
    const onRegClick = () =>{
        console.log(data, acceptRules)
        if (acceptRules){
            userApi.put('user_self_info/', data).then((r)=>{
                message.success('Your data updated')
                navigate('/')
            })
        } else {
            message.info('Check the agreement')            
        }
    }

    return <div className="regPage">
         <div className="regCard">
                <img className="regCardLogo" src='/icons/logo.svg'></img>
                <div className="regCardHeader"> {isNew? 'Registration': 'Account'}</div>
                    <div className="regCardLine">
                        <div className="regCardLineText">First name:</div>
                        <Input value={data.first_name} onChange={(e)=>setData({
                            ...data,
                            first_name:e.target.value
                        })} placeholder="Michael">
                        </Input>

                    </div>

                    <div className="regCardLine">
                        <div className="regCardLineText">Last Name:</div>
                        <Input value={data.last_name} onChange={(e)=>setData({
                            ...data,
                            last_name:e.target.value
                        })} placeholder="Purtov">
                        </Input>
                    </div>
                    <div className="regCardLine">
                        <div className="regCardLineText">E-mail:</div>
                        <Input value={data.username} type='email' onChange={(e)=>setData({
                            ...data,
                            username:e.target.value
                        })} placeholder="example@example.com">
                        </Input>
                    </div>
                    <div className="regCardLine">
                        <div className="regCardLineText">Phone number:</div>
                        <Input value={data.phone_number} type='tel' onChange={(e)=>setData({
                            ...data,
                            phone_number:e.target.value
                        })} placeholder="+11111111111">
                        </Input>

                    </div>

                    <Checkbox checked={acceptRules} onChange={()=>setAcceptRules(!acceptRules)}> I have read the <a href='/agree'>agreement</a></Checkbox>

                <Button  htmlType="submit" size="large" type='primary' className="regButton" onClick={()=>onRegClick()}>Submit</Button>
            </div> 
    </div>
}