import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './styles.css'

export const Menu:React.FC = () =>{

    let location = useLocation()
    let navigate = useNavigate()
    
    return <div className="menu">
        <div className="menu_line"></div>
        <div className="menu_wrapper">
            <div  onClick={()=>navigate('/')} className={"menu_btn" + (location.pathname == '/'? ' active':'')}>
                <img src={
                    location.pathname == '/'?
                    '/icons/menu_home_active.svg'
                    :
                    '/icons/menu_home.svg'
                    }/>
                Главная
            </div>
            <div onClick={()=>navigate('/chat/73')} className={"menu_btn" + (location.pathname.includes('chat')? ' active':'')} >
            <img src={
                    location.pathname.includes('chat')? 
                    '/icons/menu_chat_active.svg'
                    :
                    '/icons/menu_chat.svg'
                }/>
                Гид
            </div>
            <div onClick={()=>navigate('/profile')} className={"menu_btn" + (location.pathname.includes('profile')? ' active':'')}>
                <img src={
                    location.pathname.includes('profile')? 
                    '/icons/menu_profile_active.svg'
                    :
                    '/icons/menu_profile.svg'
            }/>
                Профиль
            </div>
        </div>
    </div>
}