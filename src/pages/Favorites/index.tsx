import './styles.css'
import React, { useEffect, useRef, useState } from 'react'
import { Header } from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import { Menu } from '../../components/Menu'
import { PlaceIE } from '../../types'
import { axios } from '../../lib/axios'
import { Button } from '../../components/Button'
import { PlaceCard } from '../../components/PlaceCard'

export const Favorites:React.FC =  () =>{
    const [places, setPlaces] = useState<PlaceIE[]>([])
    let navigate = useNavigate()

    const queried = useRef(false);
    const [cords, setCords] = useState({lat:48.73124, lon:44.52418})

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(position => {
    //       setCords({
    //             lat:position.coords.latitude,
    //             lon:position.coords.longitude
    //         });
    //         });
    //   }, []);

    useEffect(()=>{
        if (!queried.current) {
           queried.current = true;
           axios.get('filter/types').then((r)=>{
                axios.get('filter/categories').then((r_)=>{
                    const p = {
                        distance:100,
                        user_lat:cords.lat,
                        user_lon: cords.lon
                    }
                    let url = `favorite?${new URLSearchParams(p as any).toString()}`

                    r_.data.forEach((value:string, index:number) => {
                        url+='&categories='+value
                    });
                    r.data.forEach((value:string, index:number) => {
                        url+='&types='+value
                    });
                   axios.get(url).then((_r_) =>{
                        setPlaces(_r_.data)
                    })  
                })
            })
        }
    })

           

        


    return <div className='favorites_page'>
        <Header childLeft={<img onClick={()=>navigate('/')} src='/icons/back_arrow.svg'/>} childRight={<img onClick={()=>navigate('/search')} src='/icons/search.svg'></img>}>Избранное</Header>
        <Menu></Menu>
        <div>
            {
                places.map((value, index)=>
                    <PlaceCard {...value}/>
                )
            }
        </div>
    </div>
}