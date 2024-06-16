import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header";
import { Menu } from "../Menu";

export const RoutesPage:React.FC = () =>{
    let navigate = useNavigate()
    
    return <div>
        <Menu></Menu>
        <Header         
            childLeft={<img  onClick={()=>navigate(-1)} src='/icons/back_arrow.svg'/>}
        >Маршрут</Header>
    </div>
}