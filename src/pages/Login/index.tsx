import { App, Button, Form, Input, Space } from "antd";
import Compact from "antd/es/space/Compact";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios, auth } from "../../lib/axios";
import './styles.css'

export const Login:React.FC = () =>{
    const [email, setEmail] = useState('')
    const { message, modal, notification } = App.useApp();

    let navigate = useNavigate()

    if (localStorage.getItem('token') != null){
        navigate('/')
        window.location.reload()
    }

    const onLoginClick = () =>{
        console.log({email:email})
        auth.post('/sign-in/', {email:email}).then((r)=>{
            if (r.status == 200){
                localStorage.setItem('email', email)
                message.success('Code sended on your E-mail !')
                navigate('/login/code')
            }  
        }).catch((res)=>{
            console.log(res)
            if (res.response.status == 400){
                message.error('Email invalid')
            } else{
                message.error('Internal Server Error')
            }
        })
    }

    return <div className="loginPage">
            <div className="loginCard">
                <img className="loginCardLogo" src='/icons/logo.svg'></img>
                <div className="loginCardHeader">Welcome!</div>
                <div className="loginCardDescr">Enter your e-mail to Log in</div>
                
                <Input placeholder="example@example.com" size="large" className="loginInput" onChange={(e)=>setEmail(e.target.value)}></Input>
                <Button  htmlType="submit" size="large" type='primary' className="loginButton" onClick={()=>onLoginClick()}>Log in/Sign up</Button>
            </div> 
    </div>
}