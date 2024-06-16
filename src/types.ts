import React from "react"

export interface TestIE{
    eye_level:0|1|2|3, // 0 -нет, 1 - среднее, 2 - сильное, 3 - частичная слепота
    text_size:18|20|22, // 18 - обычный, 20 - увеличенный, 22  - огромный
    theme:0|1|2|3 // 0 - базовая, 1 - зеленая, 2- оранжевая 3 - монохромная,
    ear_level:0|1|2|3, //0 -нет,1- среднее, 2 - потеря слуха, 3 -  глухота
    move_level:0|1|2|3, //0 -нет,1- самостоятельно при помощи костылей, 2 - с коляской самостоятельно, 3 -  с коляской, нужна помощь человека
}


export interface ButtonIE{
    state?: 'primary'|'red'|'none'|'disable'
    size?: 'large'|'min'
    children: JSX.Element|string,
    className?:string,
    styles?:React.CSSProperties
    onClick: () => void
}


export interface HeaderIE{
    styles?:React.CSSProperties
    className?:string,
    onHeaderClick?: () => void,
    childLeft?: JSX.Element|string,
    childRight?: JSX.Element|string,
    children?: JSX.Element|string,
}


export interface PlaceIE{
    name:string, 
    type:string, 
    category:string,
    wheelchair_accessibility_level: number,
    movement_accesibility_level: number,
    eye_accesibility_level: number,
    ear_accesibility_level: number,
    mental_accesibility_level: number,
    link: string,
    favorite: boolean,
    id: number,
    lat:number,
    lon: number
}

export interface SwitcherIE{
    onChange: (value:boolean)=>void,
    title1: string,
    title2: string,
    value: boolean
}

export interface MapDataIE{
    lat:number,
    lon:number,
    id:number,
}

export interface CheckboxIE{
    onChange: (cheked:boolean)=>void,
    title:string,
    initialValue:boolean
}


export interface AIChatIE{
    id:string,
    name:string, 
    created:string,
    messages: MessageIE[]
    places_info?: PlaceIE[]
    image?:string

}

export interface MessageIE{
    content: string, 
    role:string,
    date_created: string

}


export interface GigachatMessageIE{
    text: string,
    date: string,
    ref?:any,
    image?:string,
    addToPlaner?:boolean

}

export interface ClientMessageIE{
    text: string,
    date: string,
    ref?:any,

}