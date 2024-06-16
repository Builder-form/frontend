import { Button, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { axios } from "../../lib/axios";
import './styles.css'


export  interface SearchInputIE{
    onSend: (msg:string) =>void
}

export const SearchInput:React.FC<SearchInputIE> = (props) =>{
    const [msg, setMsg] = useState<string>('')
    const [hints, setHints] = useState<string[]>([])
    let queried = useRef(false)

    useEffect(()=>{

     
           if (!queried.current && localStorage.getItem('token') != null) {
              queried.current = true;
              axios.get('conversation/hints').then((data) => {
                setHints(data.data as any)
              })
           }
     
          
        })

    const onSend = () => {
        if (msg != ''){
            props.onSend(msg)
            setMsg('')
        }
        setHints([])
    }
    
    const onHintClick = (hint:string) =>{
        setMsg(hint)
    }
    return <div className="searchWrapper">
        <div className="HintsWrapper">
            {
                hints.map((value, index)=>{

                    return <div onClick={()=>onHintClick(value)} className="hintBox">{value}</div>
                })
            }
        </div>
        <div className="searchInputWrapper">
            <Input onPressEnter={()=>onSend()} className="searchInput"  placeholder="Расскажи о своих планах" value={msg} onChange={(e)=>setMsg(e.target.value)}></Input>
            <Button className="searchButton"  onClick={()=>onSend()}><img src='/icons/send.svg'/></Button>
        </div>
    </div>
   
}