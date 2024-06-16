import './styles.css'

import React, { useState } from 'react'
import { CheckboxIE } from '../../types'


export const Checkbox:React.FC<CheckboxIE> = (props) =>{
    const [checked, setChecked] = useState(props.initialValue)
    
    const onClick = () =>{
        props.onChange(!checked)
        setChecked(!checked)
    }
    
    return <div className='checkbox' onClick={()=>onClick()}>
        <img src={checked? '/icons/checked.svg':'/icons/not_checked.svg'}></img>
        {props.title}
    </div>
}