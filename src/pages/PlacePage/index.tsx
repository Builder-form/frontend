import { Input } from 'antd';
import { useEffect, useRef, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Menu } from '../../components/Menu';
import { axios } from '../../lib/axios';
import { PlaceIE } from '../../types';
import './styles.css'
import { load } from '@2gis/mapgl';
import { MapWrapper } from '../../components/MapWrapper'
import { MapTest } from '../../components/MapTest';

const { TextArea } = Input;

export const PlacePage:React.FC = () =>{
    const [place, setPlace] = useState<PlaceIE>({} as PlaceIE)
    const [feedbackPopup, setFeedBackPopup] = useState(false)
    const [feedback, setFeedback] = useState('')
    const queried = useRef(false);
    const params = useParams()
    useEffect(()=>{
        if (!queried.current) {
           queried.current = true;
           axios.get('places/'+params.id).then((r) =>{
                setPlace(r.data)
            })
        }
    })


    const onLikeClick = () =>{
        if (place?.favorite){
            axios.delete('favorite/' + place?.id.toString())
            setPlace({...place, favorite:false})
            
        } else if (place){
            axios.post('favorite/' + place?.id.toString())
            setPlace({...place, favorite:true})

        }
    }
    const speechName = () =>{
        if(window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = place?.name as string;
            window.speechSynthesis.speak(utterance);
        } 
        else{
            console.log("Feature not supported");
        }
    }
    
    const onFeedbackClick = () =>{
        axios.post('/feedback/', {
            reason:feedback,
            place_id:place.id,
            lat:place.lat,
            lon:place.lon,
        })

        setFeedBackPopup(false)
    }

    let navigate = useNavigate()



    // useEffect(() => {
    //     let map:any;


    //     load().then((mapglAPI) => {
    //         map = new mapglAPI.Map('map-container', {
    //             center: [place.lon, place.lat],
    //             zoom: 12,
    //             key: '1cb63dc2-1fdb-4178-8dea-a94fed5e6f9a',
    //     });
 
    //             const marker = new mapglAPI.Marker(map, {
    //                 coordinates: [ place.lon, place.lat],
    //             });
                
    //     });

    //     return () => map && map.destroy();
    // }, []);



    return <div className='place_page'>
        <Header childLeft={<img onClick={()=>navigate(-1)} src='/icons/back_arrow.svg'/>} childRight={<img onClick={()=>navigate('/search')} src='/icons/search.svg'></img>}>Места и события</Header>
        <Menu></Menu>
        <div className='place_page_content'>
            <div style={{'backgroundImage':'url("/pictures/default_card_pic_large.png")'}} className='place_page_pic'>
                    <img onClick={()=>onLikeClick()} src={place?.favorite? '/icons/heart_active.svg':'/icons/heart.svg'}/>
                    <img onClick={()=>speechName()} src='/icons/sound.svg'/>
            </div>

            <div>
                <div className='place_page_name'>{place?.name}</div>
                <div>
                    <div>Адаптировано:</div>
                    {
                        place?.ear_accesibility_level > 0? 
                        <img src='/icons/ear.svg'/>:''
                    }
                    {
                        place?.eye_accesibility_level > 0? 
                        <img src='/icons/eye.svg'/>:''
                    }
                    {
                        place?.movement_accesibility_level > 0? 
                        <img src='/icons/non_walk.svg'/>:''
                    }
                    {
                        place?.wheelchair_accessibility_level > 0? 
                        <img src='/icons/invalid.svg'/>:''
                    }
                    {
                        place?.mental_accesibility_level > 0? 
                        <img src='/icons/documents_profile.svg'/>:''
                    }
                </div>
            </div>
            <Button state='primary' size='large' onClick={()=>null}>В путь</Button>
            <MapTest places={[place]}/>
            <Button state='red' size='large' onClick={()=>setFeedBackPopup(true)}>Пожаловаться</Button>

        </div>
        {
            feedbackPopup? 
            <div className='feedback_popup_background'>
                <div className='feedback_popup'>
                    <div className='feedback_popup_title'>Пожаловаться</div>
                    <TextArea rows={4} placeholder='Введите причину жалобы' onChange={(e)=>setFeedback(e.target.value)} value={feedback}></TextArea>
                    <Button onClick={()=>onFeedbackClick()} state='red' size='large'>Пожаловаться</Button>
                    <Button onClick={()=>setFeedBackPopup(false)} state='none' size='large'>Отмена</Button>
                </div>
            </div>
            :''
        }
    </div>
}