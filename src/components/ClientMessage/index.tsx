import React from "react";
import { ClientMessageIE } from "../../types";
import './styles.css'

export const ClientMessage:React.FC<ClientMessageIE> = (props) =>{
   

    return <div className='messageContent messageReversed' ref={props.ref}>
            <img src='/icons/cornerBlack.svg' className="corner ReversedCorner"></img>

            <div className="messageCard ReversedBox">

            <div  className="messageBox GrayBox">
                {props.text}
            </div>
            <div className="messageDate">{props.date}</div>
        </div>
    </div>

}