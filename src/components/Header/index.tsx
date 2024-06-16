import './styles.css'

import React from 'react'
import { HeaderIE } from '../../types'

export const Header:React.FC<HeaderIE> = (props) =>{

    return <div style={props.styles} className={'header' + ' ' + props.className}>
            <div className='header_left'>
                {props.childLeft}
            </div>
            <div onClick={()=>props.onHeaderClick} className='header_title'>
                {props.children}
            </div>
            <div className='header_right'>
                {props.childRight}
            </div>
    </div>
}
