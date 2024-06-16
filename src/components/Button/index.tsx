import React from "react";
import { ButtonIE } from "../../types";
import './styles.css'


export const Button:React.FC<ButtonIE> = (props) =>{


    return <div onClick={()=>props.onClick()} style={props.styles} className={"btn" +' ' + props.size+ ' ' + props.state + ' ' +  props.className}>
        {
            props.children
        }
    </div>
}