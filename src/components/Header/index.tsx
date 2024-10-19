import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import './styles.css'

export interface HeaderIE{
    isAuth?:boolean
}

export const Header:React.FC<HeaderIE> = (props) =>{
    let navigate = useNavigate()

    return <div className="HeaderContainer">
        <img className="HeaderLogo" onClick={()=>navigate('/')} src='/icons/logo.svg'/>
        
        <div className="HeaderBtnsContainer">
            <a href="mailto:support@support.com"><Button >support@support.com</Button></a>
            {
                props.isAuth == false? 
                    <></>
                    :
                <Button onClick={()=>navigate('/account')} type="primary"><img src='/icons/profile.svg'/>Account</Button>
            }
            
        </div>
    </div>
}