import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { axios, userApi } from "../../lib/axios";

export const DefaultPage:React.FC = () =>{
    

    let navigate = useNavigate()
   
    const queried = useRef(false);
    useEffect(()=>{
        if (localStorage.getItem('token') == undefined){
            navigate('/login')
        }

        if (!queried.current) {
           queried.current = true;
           userApi.get('/user_self_info/').then((r) =>{

            if (r.data.phone_number == ''){
                navigate('/register')
            }
            
        }).catch((r)=>navigate('/login'))
        }
    })

    return <div>
        <Header></Header>
        <Outlet></Outlet>
    </div>
}