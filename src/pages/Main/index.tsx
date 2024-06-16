import './styles.css'
import React from 'react'
import { Header } from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import { Menu } from '../../components/Menu'
import { Carousel } from 'antd';
import { idUpdate } from '../../lib/axios'


export const Main:React.FC = () =>{

    let navigate = useNavigate()
    idUpdate()


    return <div className='main_page'>
        <Header childLeft={<img onClick={()=>navigate('/')} src='/icons/logo.svg'/>} childRight={<img onClick={()=>navigate('/search')} src='/icons/search.svg'></img>}>Главная</Header>
        <Menu/>
        <div className='main_page_carousel'>
            <Carousel autoplay>
                <img alt='Баннер' src='/pictures/main_banner_main.svg'/>
                <img alt='Баннер' src='/pictures/main_banner_1.svg' />
                <img alt='Баннер' src='/pictures/main_banner_2.svg' />
            </Carousel>
        </div>

        <div className='main_page_content'>
            <img alt='Места' onClick={()=>navigate('/places')} src='/pictures/main_locations.svg'/>
            <img alt='Рекомендации' onClick={()=>navigate('/recommendations')} src='/pictures/main_recommendations_card.svg'/>
            <img alt='Маршруты' onClick={()=>navigate('/chat/27')}src='/pictures/main_routes.svg'/>
            <img alt='Избранное' onClick={()=>navigate('/favorites')} src='/pictures/main_favorites_card.svg'/>
        </div>
        
    </div>
}