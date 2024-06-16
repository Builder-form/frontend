import React, { useEffect, useState } from "react";
import { GigachatMessageIE } from "../../types";
import './styles.css'
import { App } from 'antd';
import { BACKEND_URL } from "../../config"; 
import { Button } from "../Button";
import {TelegramShareButton} from "react-share";
import Markdown from 'react-markdown'

export const GigachatMessage:React.FC<GigachatMessageIE> = (props) =>{
    const { message, notification, modal } = App.useApp();

    const onLike = () =>{

    }

    const onDislike = () =>{

    }

    const onShareClick = () =>{

    }

    const onAddToPlanerClick = () =>{
        message.info('Перейдем к маршруту! \n')
        // setTimeout(()=>window.location.replace('https://hl.russpass.ru/U8C'), 1000 )
    }


    const onCopy = () =>{
        message.info('Сообщение скопировано!')
        try{
            navigator.clipboard.writeText(props.text)
        } catch{
            message.error('Для копирования нужен HTTPS')
        }
    }

    return <div className='messageContent' ref={props.ref}>
            <img src='/icons/corner.svg' className="corner"></img>
            <div className="messageCard">
                <div className="messageBox">
                    {
                        props.image == undefined? <></>:
                            <img className="messageImage" src={BACKEND_URL+props.image}></img>
                    }
                    {/* <div dangerouslySetInnerHTML={{ __html: props.text }} >
                    </div> */}

                    <Markdown>{props.text.replaceAll('\\n', '\n').slice(1,-2)}</Markdown>

                    <div className="messageIconsWrapper">
                            {props.addToPlaner == true? 
                            <Button onClick={()=>onAddToPlanerClick()} className="addToPlanerBtn">Перейти к маршруту</Button>
                            :<></>}
                            <img className="messageIcon" onClick={()=>onCopy()} src='/icons/copy.svg'></img>
                            <TelegramShareButton
                                url={"|"+props.text.toString()}
                                title={'MAYAK AI чат гид'}
                                className="Demo__some-network__share-button"
                            >
                                <img className="messageIcon" onClick={()=>onShareClick()} src='/icons/share.svg'></img>
                            </TelegramShareButton>
                            <div className="likeDislikeWrapper">
                                <img className="messageIcon" onClick={()=>onLike()} src='/icons/like.svg'></img>
                                <img className="messageIcon" onClick={()=>onDislike()} src='/icons/dislike.svg'></img>
                            </div>
                    </div>
                </div>
               
            </div>
            <div className="messageDate">{props.date}</div>
    </div>

}