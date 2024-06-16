import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { axios, idUpdate } from "../../lib/axios";
import { TestIE } from "../../types";

export const DefaultPage:React.FC = () =>{
    const [userData, setUserData] = useState<TestIE>({
        eye_level: 0,
        text_size: 18,
        theme: 0,
        ear_level: 0,
        move_level: 0
      })

    let navigate = useNavigate()
    idUpdate()
    useEffect( () =>{
        if (localStorage.getItem('user-id') == null){
            navigate('/auth/login')
            return
        }
    })
    const queried = useRef(false);
    useEffect(()=>{
        if (!queried.current) {
           queried.current = true;
           idUpdate()
           axios.get('settings/').then((r) =>{
                
                setUserData(r.data)
            }).catch((r)=>navigate('/auth/onBoarding/start'))
        }
    })

    const themes = ['base_theme', 'green_theme', 'orange_theme', 'monochrome_theme']
    return <div className={themes[userData?.theme as number]} >
        <Outlet></Outlet>
    </div>
}