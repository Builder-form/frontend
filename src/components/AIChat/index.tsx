import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../lib/axios";
import { ClientMessage } from "../ClientMessage";
import { GigachatMessage } from "../GigachatMessage";
import './styles.css'
import { SearchInput } from "../SearchInput";
import { Button } from "../Button";
import { Input, Spin } from "antd";
import { AIChatIE, PlaceIE } from "../../types";
import { MyMap } from "../map";
import { Switcher } from "../Switcher";
import { Header } from "../Header";
import { Menu } from "../Menu";
const { TextArea } = Input;


export const AIChat:React.FC = () =>{
    const [chatData, setChatData] = useState<AIChatIE>()
    let { chatID } = useParams();
    const queried = useRef(false);
    const [messages, setMessages] = useState([])
    const navigate = useNavigate()
    const [activeEvent, setActiveEvent] = useState<PlaceIE>()
    const [cords, setCords] = useState({lat:48.73124, lon:44.52418})
    const [feedbackPopup, setFeedBackPopup] = useState(false)
    const [feedback, setFeedback] = useState('')

    const [showMap, setShowMap] = useState(false)

    const onFeedbackClick = () =>{
        axios.post('/feedback/', {
            reason:feedback,
            lat:cords.lat,
            lon:cords.lon,
        })

        setFeedBackPopup(false)
    }

        useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
          setCords({
                lat:position.coords.latitude,
                lon:position.coords.longitude
            });
            });
      }, []);
    useEffect(()=>{
        
        
       if (!queried.current) {
          queried.current = true;
          axios.get('api/conversation/' + chatID?.toString() + '/').then((data) => {
            console.log(data.data)
            setChatData(data.data as any)
            if (data.data.places_info.length > 0){
                setActiveEvent(data.data.places_info[0])
            }
            

               let flag = true
                let reversed = data.data.messages.reverse()
                let l_msg = reversed.map((value:any, index:number)=>{
                    let date = new Date(Date.parse(value.date_created))
                    if (value.role == 'user'){
                        return  <ClientMessage text={value.content.toString()} date={date.getHours()+':'+date.getMinutes()} /> 
                    // } else if (value.role == 'function' && flag){
                    //     flag = false
                    //     return <GigachatMessage image={data.data.image} text={'Фото маршрута'} date={date.getHours()+':'+date.getMinutes()}/>
                    }else if ((value as any).content.name == undefined){
                        if (index < reversed.length-1 && reversed[index+1].content?.name != undefined ){
                            return <GigachatMessage addToPlaner={true} text={value.content.toString().replaceAll('\n', '<br></br>')} date={date.getHours()+':'+date.getMinutes()}/>

                        }else{
                            return <GigachatMessage text={value.content.toString().replaceAll('\n', '<br></br>')} date={date.getHours()+':'+date.getMinutes()}/>
  
                        }
                    }
                }) as any
                let l_msg_reversed = l_msg.reverse()
                setMessages(
                    l_msg_reversed
                )
          })
       }  
    })



    const onSendMessage = (msg:string) =>{
        let now = new Date()
        setMessages([...messages, <ClientMessage text={msg} date={now.getHours().toString()+":"+now.getMinutes()} />] as any)

        axios.post('api/conversation/create_message?user_lat=48.73124&user_lon=44.52418',{
            content: msg,
            conversation_id: chatID
          }).then((data) => {
        
                let flag = true
                let reversed = data.data.messages.reverse()
                let l_msg = reversed.map((value:any, index:number)=>{
                    let date = new Date(Date.parse(value.date_created))
                    if (value.role == 'user'){
                        return  <ClientMessage text={value.content.toString()} date={date.getHours()+':'+date.getMinutes()} /> 
                    } else if (value.role == 'function' && flag){
                        flag = false
                        return <GigachatMessage image={data.data.image} text={'Фото тура'} date={date.getHours()+':'+date.getMinutes()}/>
                    }else if ((value as any).content.name == undefined){
                        return <GigachatMessage text={value.content.toString().replaceAll('\n', '<br></br>')} date={date.getHours()+':'+date.getMinutes()}/>
                    }
                }) as any
                let l_msg_reversed = l_msg.reverse()
                console.log(l_msg, l_msg_reversed)
                setMessages(
                    l_msg_reversed
                )
                setChatData(data.data as any)
                setActiveEvent(data.data.places_info[0])
          })
    }

    const listRef = useRef(null);
    useEffect(() => {
        (listRef.current as any).lastElementChild?.scrollIntoView()
    }, [messages]);
    
    const onNextEventClick = () => {
        if (chatData?.places_info != undefined){
            chatData?.places_info.forEach((value:any, index:number)=>{
                if (value.name == activeEvent?.name && chatData?.places_info != undefined){
                    setActiveEvent(chatData?.places_info[(index+1)%chatData?.places_info.length])
                }
            }) 
        }
    }

    const onBackEventClick = () => {
        if (chatData?.places_info != undefined){
            chatData?.places_info.forEach((value:any, index:number)=>{
                if (value.name == activeEvent?.name && chatData?.places_info != undefined){
                    setActiveEvent(chatData?.places_info[(index-1) < 0? chatData?.places_info.length-Math.abs(index-1): (index-1)])
                }
            }) 
        }
    }
    const onBuyEventClick = (event:string)=>{

    }
    
    console.log('CREATE ROUTE',  chatData?.places_info == undefined ||  chatData?.places_info.length == 0? [{cords:[37.6156, 55.7522], title:'Москва', description:'Москва'}]
    :
    chatData?.places_info.map((value:any, index:number)=>{
        console.log(value)
        return {
            cords: [ value.lon, value.lat,] as number[],
        title: value.name,
        description: value.name,
    }

    })
    )


    const speechName = (text:string) =>{
        if(window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = text;
            window.speechSynthesis.speak(utterance);
        } 
        else{
            console.log("Feature not supported");
        }
    }

    return <div className="mainAiChatWrapper">
        <Header 
        childRight={<img src='/icons/sound.svg' onClick={()=>speechName((showMap? activeEvent?.name: chatData?.messages[0].content) as any)}></img>}
        childLeft={<img  onClick={()=>navigate(-1)} src='/icons/back_arrow.svg'/>}>
        Чат-Гид
        </Header>

        <div className="AiChatWrapper">
        <Switcher title1="Чат-Гид" title2='Карта' value={!showMap} onChange={(e)=>setShowMap(!e)}></Switcher>   
        {  
            showMap? 
            <div className="mapOverlay">
            <div className="mapPrefs">
                <div className='aichat_map_popup'>
                        <div className="map_popup_arrow_wrapper">
                            <div className="mapArraw" onClick={()=>onBackEventClick()}><img className="" src='/icons/arrow.svg'/></div>
                            <div className="mapArraw" onClick={()=>onNextEventClick()}><img className="reversedArrow" src='/icons/arrow.svg'/></div>
                        </div>
                        
                        <div className='aichat_map_popup_title'>{activeEvent?.name}</div>
                        <Button onClick={()=>navigate('/places/'+activeEvent?.id.toString())} state='primary' size='large'>Подробнее</Button>
                </div>
            </div>
            {
                chatData == undefined? <Spin></Spin> : <MyMap
                    routeCreate={
                        chatData.places_info == undefined? false:true
                    }
                    points={                                                                            
                        chatData?.places_info == undefined ||  chatData?.places_info.length == 0? [{cords:[44.52418,48.73124], title:'Волгоград', description:'Волгоград'}]
                        :
                        chatData?.places_info.map((value:any, index:number)=>{
                            return {
                                cords: [ value.lon, value.lat] as number[],
                            title: value.name,
                            description: value.name,
                        }

                        })
                        }
                ></MyMap>
            }
            
            </div>


            :


            <div className="AiChat">
            <div className="AiChatHeader">
                {/* <h2>{chatData?.name}</h2> */}
            </div>
            <div ref={listRef} className="aiChatMessages">
                {
                   (messages.reverse() as any)
                }
            </div>
            <SearchInput onSend={(msg)=>onSendMessage(msg)}></SearchInput>
        </div>
        }
            

        
       
        </div>
        {
            showMap?         <img onClick={()=>setFeedBackPopup(true)} src="/icons/feedback.svg" className="feedback_button"/>:''

        }
            
        {
            feedbackPopup? 
            <div className='feedback_popup_background'>
                <div className='feedback_popup'>
                    <div className='feedback_popup_title'>Пожаловаться</div>
                    <div>{JSON.stringify(cords)}</div>
                    <TextArea rows={4} placeholder='Введите причину жалобы' onChange={(e)=>setFeedback(e.target.value)} value={feedback}></TextArea>
                    <Button onClick={()=>onFeedbackClick()} state='red' size='large'>Пожаловаться</Button>
                    <Button onClick={()=>setFeedBackPopup(false)} state='none' size='large'>Отмена</Button>
                </div>
            </div>
            :''
        }
        
    </div> 
}