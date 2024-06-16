import React, { useEffect, useRef } from "react";
import { load } from '@2gis/mapgl';
import { MapWrapper } from '../../components/MapWrapper'
import { PlaceIE } from "../../types";

export interface MapTestIE{
    places:PlaceIE[]
    onMap?:boolean
    height?: string
    onMarkerClick?: (id:string)=>void
}

export const MapTest:React.FC<MapTestIE> = (props) => {
        let places = props.places

        const loaded = useRef(false);

        let map:any;
        console.log(places)
        if (places.length>0 && places[0].category != undefined && !loaded.current){
            loaded.current = true;
            load().then((mapglAPI) => {
                map = new mapglAPI.Map('map-container-place', {
                    center: places.length == 1? [places[0].lon, places[0].lat]:[44.52418, 48.73124],
                    zoom: 12,
                    key: '1cb63dc2-1fdb-4178-8dea-a94fed5e6f9a',
                });
                places.forEach((place, index)=>{
                    const marker = new mapglAPI.Marker(map, {
                        coordinates: [ place.lon, place.lat],
                    });
                    marker.on('click', (e) => {
                        if (props.onMarkerClick != undefined){
                            props.onMarkerClick(place.id.toString())
                        }
                    })
                })
                    
        });
        }
        

    return <div style={{ width: '100%', height: (props.height == undefined? '200px':props.height)}}>
                <MapWrapper />
            </div>
    
    
}
