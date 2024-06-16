import './styles.css'
import React, { useEffect, useRef, useState } from 'react'
import { Header } from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import { Menu } from '../../components/Menu'
import { PlaceIE } from '../../types'
import { axios } from '../../lib/axios'
import { Button } from '../../components/Button'
import { PlaceCard } from '../../components/PlaceCard'

export const Recommendations:React.FC =  () =>{
    const [places, setPlaces] = useState<PlaceIE[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [cords, setCords] = useState({lat:48.73124, lon:44.52418})
    const [types, setTypes] = useState<{types:string[], ltypes:string[]}>({types:[], ltypes:[]})
    const [categories, setCategories] = useState<{categories:string[], lcategories:string[]}>({categories:[], lcategories:[]})
    let navigate = useNavigate()

    const queried = useRef(false);
    const updatePageNumber = () =>{
        axios.get('recommendations?page='+ (pageNumber+1).toString()).then((r) =>{
            setPlaces([...places, ...r.data])
        })
        setPageNumber(pageNumber+1)
    }

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
            let l = new Array<string>()
            r.data.forEach((value:string, index:number) => {
                l.push(value)
            });
            setTypes({types:r.data, ltypes: l})
                axios.get('filter/categories').then((r_)=>{
                    let l_ = new Array<string>()
                    r_.data.forEach((value:string, index:number) => {
                        l_.push(value)
                    });
                    setCategories({categories:r_.data, lcategories:l_})

                    const p = {
                        page: '1',
                        distance:100,
                        user_lat:cords.lat,
                        user_lon: cords.lon
                    }
                    let url = `recommendations?${new URLSearchParams(p as any).toString()}`

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

           

        


    return <div className='recommendations_page'>
        <Header childLeft={<img onClick={()=>navigate('/')} src='/icons/back_arrow.svg'/>} childRight={<img onClick={()=>navigate('/search')} src='/icons/search.svg'></img>}>Рекомендации</Header>
        <Menu></Menu>
        <div>
            {
                places.map((value, index)=>
                    <PlaceCard {...value}/>
                )
            }
        </div>
        <Button state='none' size='large' onClick={()=>updatePageNumber()}>Далее</Button>

    </div>
}