import React, { useEffect, useState } from "react";
import Map, {Source, Layer, Marker, Popup} from 'react-map-gl';
import axios from 'axios'
import path from "path";


export interface MapIE{
  routeCreate?:boolean,

  points: {
    cords:number[],
    title:string,
    description:string
  }[]

  remapedPoints?:{
    cords:number[],
    title:string,
    description:string
  }[]

}

export const MyMap: React.FC<MapIE> = (props) =>{
    let pathString = ''


    props.points.forEach((point, index) => {
      pathString = pathString + point.cords[0] + ',' +  point.cords[1] + (index == (props.points.length-1)? '':';')
    });
    
    const [route, setRoute] = useState()



    useEffect(()=>{
      if (props.routeCreate != false){
          setTimeout(()=> axios.get('https://api.mapbox.com/directions/v5/mapbox/walking/'+pathString+'?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoiZmlyZXNpZWh0IiwiYSI6ImNrdW9kemYzbTB4ZGkycHAxbXN2YnIzaGMifQ.G0fl-qVbecucfOvn8OtU4Q').then(
            (data:any) => setRoute(data.data.routes[0].geometry)
          ).catch((err)=>console.log('ERRRRRRRR')), 1000)
      }
    })
      
    



   

    const geojson = {
        type: 'FeatureCollection',
        features: props.points.map((point, index)=>{ 
            return {
              type: 'Feature', 
              geometry: {
                type: 'Point', 
                coordinates: point.cords, 
            },
            properties: {
              'title':  point.title
            }}
          }
        )
      };
    

    const layerWayStyle ={
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: route
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#43B4FF',
          'line-width': 5,
          'line-opacity': 0.75
        }
    }
    const layerStyle = {
        id: 'point',
        type: 'symbol',
        iconImage: 'custom-marker',
        layout: {
          'text-field': ['get', 'title'],
          'text-font': [
          'Open Sans Semibold',
          'Arial Unicode MS Bold'
          ],
          'text-size': 8,
          'text-offset': [0, 0],
          'text-anchor': 'top'
        }
      };

    const CircleLayer = {
      id: 'circle-layer',
      type: 'circle',
      source: 'national-park',
      paint: {
        'circle-radius': 8,
        'circle-color': '#0099FF'
  }
    }

    
    
      
    return (
    <div style={{width:'100%', height:'80vh', overflow:'hidden'}}>
        

        <Map initialViewState={props.points.length == 1? {
            longitude: props.points[0].cords[0],
            latitude: props.points[0].cords[1],
            zoom: 11
        }:{
          longitude: props.points[1].cords[0],
          latitude: props.points[1].cords[1],
          zoom: 11
      }}
        style={{width: '100%'}}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken='pk.eyJ1IjoiZmlyZXNpZWh0IiwiYSI6ImNrdW9kemYzbTB4ZGkycHAxbXN2YnIzaGMifQ.G0fl-qVbecucfOvn8OtU4Q'
        >

        <Source id="way-data" type="geojson" data={route as any}>
          <Layer {...layerWayStyle as any} />
        </Source>
        <Source id="my-data" type="geojson" data={geojson as any}>
          <Layer {...layerStyle as any} />
          <Layer {...CircleLayer as any}></Layer>
        </Source>


        {/* {
          props.points.map((point, index)=>{
            return  <Marker longitude={point.cords[1]} latitude={point.cords[0]}  >
            <img src="/pin.png" />
          </Marker>
          })
        } */}
        {/* {
          props.remapedPoints != undefined?  props.remapedPoints.map((point, index)=>{
            return  <Marker onClick={(e)=>console.log(e, 'click' + point.title)} longitude={point.cords[0]} latitude={point.cords[1]} anchor="bottom" >
            <img onClick={()=>'IMG IMG IMG'} src="/redpin.png" />
          </Marker>
          }) : null
        } */}
      </Map>
    </div>
      
    );
}
