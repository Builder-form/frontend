import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import './styles.css'

export const Profile = () =>{
    let navigate = useNavigate()
    return <div className="profile_page">
        <Header onHeaderClick={()=>null} childLeft={<img src='/icons/back_arrow.svg' onClick={()=>navigate(-1)}/>} childRight={<div onClick={()=>{navigate('/auth/login'); localStorage.clear()}} style={{'textDecoration':'underline'}}>Выйти</div>}>Профиль</Header>
        <Menu/>

        <div onClick={()=>navigate('/auth/onBoarding/start')} className="profile_page_card">
            <div className="profile_page_card_title">Повторное тестирование</div>
            <div className="profile_page_card_line"></div>
        </div>
        <div onClick={()=>navigate('/auth/onBoarding/start')} className="profile_page_card">
            <div className="profile_page_card_title">Настройки</div>
            <div className="profile_page_card_line"></div>
        </div>
        <div onClick={()=>navigate('/about')} className="profile_page_card">
            <div className="profile_page_card_title">О приложении</div>
            <div className="profile_page_card_line"></div>
        </div>
    
        <a href="tel:112">
            <Button className="sos_btn" onClick={()=>null} state='red' size='large'>SOS (ЭКСТРЕННЫЙ ВЫЗОВ)</Button>
        </a>
    </div>
}