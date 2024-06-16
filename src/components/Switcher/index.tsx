import './styles.css'

import React from 'react'
import { SwitcherIE } from '../../types'

export const Switcher:React.FC<SwitcherIE> = (props)=>{
    return <div className='switcher'>
        <div onClick={()=>props.onChange(true)} className={'switcher_value' + ' ' + (props.value? 'active_switcher':'')}>
            {props.title1}
        </div>
        
        <div onClick={()=>props.onChange(false)} className={'switcher_value' + ' ' + (props.value? '':'active_switcher')}>
            {props.title2}
        </div>
    </div>
}