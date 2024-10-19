import { Checkbox, Input, InputNumber, Radio } from "antd";
import React, { useState } from "react";
import { AnswerIE } from "../../types";
import './styles.css'

export interface AnswerComponentIE{
    answer:AnswerIE,
    onChecked: (e:{text:string, checked:boolean, id:string, })=>void
}

export const Answer:React.FC<AnswerComponentIE> = (props) =>{
    const [checked, setChecked] = useState(props.answer.type == 'NUMBER EACH')

    const [customAnswer, setCustomAnswer] = useState('')

    const onChecked = () =>{
        if (props.answer.type == 'CUSTOM'){
                props.onChecked({id:props.answer.id, text:customAnswer, checked: !checked})
                setChecked(!checked)
        }
        else{
                props.onChecked({id:props.answer.id, text:props.answer.text, checked: !checked})
                setChecked(!checked)
            }
        }
    
    const setAnswer = (text:string) =>{
        props.onChecked({id:props.answer.id, text:text, checked: checked})
        setCustomAnswer(text)
    }

    return (
        <>
                {
                    props.answer.type == 'SINGLE'? 
                    <Radio onClick={()=>onChecked()} value={props.answer.text}>{props.answer.text}</Radio>
                    :
                    props.answer.type == 'NUMBER EACH'? 
                    <InputNumber onChange={(e:any)=>setAnswer(e?.toString())} ></InputNumber>:
                    (props.answer.type == 'CUSTOM' || props.answer.text == "Customise:")? 
                    <>
                        <Checkbox onChange={()=>onChecked()}>Custom answer</Checkbox>
                        <Input className="customAnswerInput" onChange={(e)=>setAnswer(e.target.value)} disabled={!checked}  placeholder="Enter answer"></Input>
                    </>:
                    (props.answer.type == 'MULTI - NQ ONE' || props.answer.type == 'MULTI - NQ EACH')?
                    <Checkbox onChange={()=>onChecked()}>{props.answer.text}</Checkbox>:
                    <div></div>
                   
                }
        </>
    )
}