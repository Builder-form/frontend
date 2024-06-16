import './styles.css'
import React, { useState } from 'react'
import { PlaceIE } from '../../types'
import { axios } from '../../lib/axios'
import { useNavigate } from 'react-router-dom'

export const PlaceCard:React.FC<PlaceIE> = (props) =>{
    const [lprops, setProps] = useState<PlaceIE>(props)

    const onLikeClick = () =>{
        if (lprops.favorite){
            axios.delete('favorite/' + lprops.id.toString())
            setProps({...lprops, favorite:false})
            
        } else{
            axios.post('favorite/' + lprops.id.toString())
            setProps({...lprops, favorite:true})

        }
    }
    const speechName = () =>{
        if(window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = lprops.name;
            window.speechSynthesis.speak(utterance);
        } 
        else{
            console.log("Feature not supported");
        }
    }
    let navigate = useNavigate()

    return <div className='place_card'>
        <div className='place_card_wrapper'>
            <div style={{'backgroundImage':'url("/pictures/default_card_pic.png")'}} className='place_card_pic'>
                <img onClick={()=>onLikeClick()} src={lprops.favorite? '/icons/heart_active.svg':'/icons/heart.svg'}/>
                <img onClick={()=>speechName()} src='/icons/sound.svg'/>
            </div>
            <div  onClick={()=>navigate('/places/'+props.id.toString())}>
                <div>{lprops.name}</div>
                {/* <br></br> */}
                <div>
                    <div>Адаптировано:</div>
                    {
                        lprops.ear_accesibility_level > 0? 
                        <img src='/icons/ear.svg'/>:''
                    }
                    {
                        lprops.eye_accesibility_level > 0? 
                        <img src='/icons/eye.svg'/>:''
                    }
                    {
                        lprops.movement_accesibility_level > 0? 
                        <img src='/icons/non_walk.svg'/>:''
                    }
                    {
                        lprops.wheelchair_accessibility_level > 0? 
                        <img src='/icons/invalid.svg'/>:''
                    }
                    {
                        lprops.mental_accesibility_level > 0? 
                        <img src='/icons/documents_profile.svg'/>:''
                    }
                </div>
            </div>
        </div>
        <div className='place_card_line'></div>
    </div>
}