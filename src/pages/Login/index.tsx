import { Input, Space } from "antd";
import Compact from "antd/es/space/Compact";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { axios, idUpdate } from "../../lib/axios";
import './styles.css'

export const Login:React.FC = () =>{
    const [tel, setTel] = useState('')
    const [code, setCode] = useState('7')

    let navigate = useNavigate()

    // if (localStorage.getItem('user-id') != null){
    //     navigate('/')
    //     window.location.reload()
    // }

    const onLoginClick = () =>{
        axios.get('/sign-in?phone='+tel,).then((r)=>{
                if (r.status == 200){
                    localStorage.setItem('user-id', r.data)
                    navigate('/auth/onBoarding/start')
                    window.location.reload()
                } 
            }
        ).catch((c)=>{
                axios.post('/sign-up', {phone:tel}).then((r_)=>{
                    localStorage.setItem('user-id', r_.data.id)
                    navigate('/auth/onBoarding/start')
                    window.location.reload()

                })

        })     
    }



    return <div className="login_page">
            <img className="login_pic" src='/pictures/welcome.svg'></img>
            <div className="login_title">Номер телефона</div>
            <Space.Compact className="login-input">
                        <Input style={{ width: '17%', textAlign:'center', fontSize:'16px'}} value={'+' + code} onChange={(e)=>setCode(e.target.value.slice(1))} />
                        <Input onPressEnter={()=>onLoginClick()} value={tel} onChange={(e)=>setTel(e.target.value)} placeholder="Номер телефона" maxLength={10} style={{maxWidth:'350px', width: '83%', fontSize:'16px'}} defaultValue="26888888" />    
            </Space.Compact>
            <Button className="login_btn" size="large" state='disable' onClick={()=>onLoginClick()}>Продолжить</Button>
    </div>
}