import './styles.css'
import React, { useEffect, useRef, useState } from 'react'
import { Header } from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import { Menu } from '../../components/Menu'
import {MapDataIE, PlaceIE } from '../../types'
import { axios } from '../../lib/axios'
import { Button } from '../../components/Button'
import { PlaceCard } from '../../components/PlaceCard'
import { Switcher } from '../../components/Switcher'
import { load } from '@2gis/mapgl';
import { MapWrapper } from '../../components/MapWrapper'
import { Drawer, Slider } from 'antd'
import { Checkbox } from '../../components/Сheckbox'
import { MapTest } from '../../components/MapTest'

export const Places:React.FC =  () =>{
    const [places, setPlaces] = useState<PlaceIE[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [onMap, setOnMap] = useState(false)
    const [mapData, setMapData] = useState<MapDataIE[]>([])
    const [activeMapPlace, setActiveMapPlace] = useState<PlaceIE>()
    const [cords, setCords] = useState({lat:48.73124, lon:44.52418})
    const [openFilters, setOpenFilters] = useState(false);
    const [distance, setDistance] = useState(100)
    const [types, setTypes] = useState<{types:string[], ltypes:string[]}>({types:[], ltypes:[]})
    const [categories, setCategories] = useState<{categories:string[], lcategories:string[]}>({categories:[], lcategories:[]})
    

    let navigate = useNavigate()
    const queried = useRef(false);

    // const loaded = useRef(false);

    // let map:any;
    // console.log(mapData, 'MAPDATA')
    // if (mapData.length>0 && mapData[0].id != undefined && !loaded.current){
    //     loaded.current = true;
    //     load().then((mapglAPI) => {
    //         map = new mapglAPI.Map('map-container-place', {
    //             center: [44.52418, 48.73124],
    //             zoom: 12,
    //             key: '1cb63dc2-1fdb-4178-8dea-a94fed5e6f9a',
    //         });

    //         mapData.forEach((coord:any) => {
    //                 const marker = new mapglAPI.Marker(map, {
    //                     coordinates: [ coord.lon, coord.lat],
    //                 });
    //                 marker.on('click', (e) => {
    //                     axios.get('places/'+coord.id.toString()).then((r) =>{
    //                         setActiveMapPlace(r.data)
    //                     })
                        
    //                     // setActiveMapPlace(place)
    //                 });
    //             });
              
    // });
    // }





    const updatePageNumber = () =>{
        axios.get('places?page_number='+ (pageNumber+1).toString()).then((r) =>{
            setPlaces([...places, ...r.data])
        })
        setPageNumber(pageNumber+1)
    } 
    
    const onMarkerClick = (id:string) => {
        axios.get('places/'+id).then((r) =>{
                setActiveMapPlace(r.data)
        })
                        
    }


    useEffect(() => {
        let map:any;

        axios.get('map/places').then((r)=>{
            setMapData(r.data)
            // console.log('LOAD MAP', r.data)

            // load().then((mapglAPI) => {
            //     map = new mapglAPI.Map('map-container-place', {
            //         center: [44.52418, 48.73124],
            //         zoom: 12,
            //         key: '1cb63dc2-1fdb-4178-8dea-a94fed5e6f9a',
            // });
     
            //     // r.data.forEach((coord:any) => {
            //     //     const marker = new mapglAPI.Marker(map, {
            //     //         coordinates: [ coord.lon, coord.lat],
            //     //     });
            //     //     marker.on('click', (e) => {
            //     //         axios.get('places/'+coord.id.toString()).then((r) =>{
            //     //             setActiveMapPlace(r.data)
            //     //         })
                        
            //     //         // setActiveMapPlace(place)
            //     //     });
            //     // });
        //     });
    
        //     return () => map && map.destroy();
        })

        
    }, []);
    
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
                        page_number: '1',
                        // categories: r_.data,
                        // types:r.data,
                        distance:distance,
                        user_lat:cords.lat,
                        user_lon: cords.lon
                    }
                    let url = `places?${new URLSearchParams(p as any).toString()}`

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

    const onCategoryChange = (value:string, checked:boolean) =>{

        if (checked){
            setCategories({
                categories:categories.categories,
                lcategories: [...categories.categories, value]
            })
        } else{
            let l = categories.lcategories
            l.splice(l.indexOf(value), 1)
            setCategories({
                categories:categories.categories,
                lcategories: l
            })
        }
    }

    const onTypesChange = (value:string, checked:boolean) =>{
        console.log(value, checked, types)
        if (checked){
            setTypes({
                types:types.types,
                ltypes: [...types.ltypes, value]
            })
        } else{
            let l = types.ltypes
            l.splice(l.indexOf(value), 1)
           


            setTypes({
                types:types.types,
                ltypes:l
            })
        }

    }
           

    const closeDrawer = () =>{
        const p = {
            page_number: '1',
            distance:100,
            user_lat:cords.lat,
            user_lon: cords.lon
        }
        let url = `places?${new URLSearchParams(p as any).toString()}`

        categories.lcategories.forEach((value:string, index:number) => {
            url+='&categories='+value
        });
        types.ltypes.forEach((value:string, index:number) => {
            url+='&types='+value
        });
        axios.get(url).then((_r_) =>{
            setPlaces(_r_.data)
            console.log('DATA',_r_.data)
            setOpenFilters(false)
            setOnMap(true)
        }) 


    }

    return <div className='places_page'>
        <Header childLeft={<img onClick={()=> openFilters? closeDrawer():navigate('/')} src='/icons/back_arrow.svg'/>} childRight={<img onClick={()=>navigate('/search')} src='/icons/search.svg'></img>}>Места и события</Header>
        <Menu></Menu>
        <div className='place_page_switcher_wrapper'>
            <Switcher 
                title1='Списком'
                title2='На карте'
                value={!onMap}
                onChange={(value)=>setOnMap(!value)}
            />
            <img src='/icons/filters.svg' onClick={()=>setOpenFilters(true)}/>
        </div>
        
        

        

    
       {
            onMap? 
            activeMapPlace == undefined? '':
            <div className='map_popup'>
                <div className='map_popup_title'>{activeMapPlace.name}</div>
                <Button onClick={()=>navigate('/places/'+activeMapPlace.id.toString())} state='primary' size='large'>Подробнее</Button>
            </div>
            
            : 
            <>
                <div>
                {
                    places.map((value)=>
                        <PlaceCard {...value}/>
                    )
                }
                </div>
                <Button state='none' size='large' onClick={()=>updatePageNumber()}>Далее</Button>
            </>  
            
       }
        <MapTest onMarkerClick={(id)=>onMarkerClick(id)} onMap={onMap} height='calc(100vh - 200px)'  places={places}/>



    <Drawer  title="Фильтр" onClose={()=>closeDrawer()} open={openFilters}>
       <div className='place_drawer'>
            <div className='drawer_title'>Тип доступности</div>
            <div className='checkbox_wrapper'>
                {
                    types.types.map((value, index)=>
                    <Checkbox initialValue={true} title={value} onChange={(checked)=>onTypesChange(value, checked)}></Checkbox>
                    )
                }
            </div>
            <div className='drawer_title'>Категории</div>
            <div className='checkbox_wrapper'>
                {
                    categories.categories.map((value, index)=>
                    <Checkbox initialValue={true} title={value} onChange={(checked)=>onCategoryChange(value, checked)}></Checkbox>
                    )
                }
            </div>
            <div className='drawer_title'>Радиус поиска (км)</div>
            <Slider max={100} value={distance} step={distance<10? 1:5} onChange={(e)=>setDistance(e)}  />


        </div>

      </Drawer>
       
    </div>
}