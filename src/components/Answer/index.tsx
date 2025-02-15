import { Checkbox, Input, InputNumber, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { AnswerIE } from "../../types";
import './styles.css'
import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";

export interface AnswerComponentIE {
    answer: AnswerIE,
    onChecked: (e: { text: string, checked: boolean, id: string, }) => void
    disabled?:boolean;
    checked?:boolean;
    isLeaveAsItIs?:boolean;
}

export const Answer: React.FC<AnswerComponentIE> = (props) => {
    // const [checked, setChecked] = useState(props.answer.type == 'NUMBER EACH')

    const [customAnswer, setCustomAnswer] = useState('')

    const onChecked = () => {
        if (props.answer.type == 'CUSTOM') {
            props.onChecked({ id: props.answer.id, text: customAnswer, checked: !props.checked })
            // setChecked(!checked)
        }
        else {
            props.onChecked({ id: props.answer.id, text: props.answer.text, checked: !props.checked })
            // setChecked(!checked)
        }
    }

    const setAnswer = (text: string) => {
        props.onChecked({ id: props.answer.id, text: text, checked: props.checked == undefined ? false : props.checked })
        setCustomAnswer(text)
    }
    // const isLeaveAsItIs = () => {
    //     return props.answer.text == "LEAVE AS IT IS:" || props.answer.text == "Leave as it is"
    // }
    // useEffect(() => {
    //     if (!props.disabled && !isLeaveAsItIs()) {
    //         setChecked(true); // Устанавливаем checked в false
    //         props.onChecked({ id: props.answer.id, text: props.answer.text, checked: true });
    //     }
    // }, [props.disabled])

    

    const checkDisabled = () => {
        return props.disabled == undefined ? false : (props.isLeaveAsItIs != true && props.disabled == true)
    }

    return (
        <>
            {
                props.answer.type == 'SINGLE' && !props.isLeaveAsItIs ?
                    <Radio className="ProjectPageRadio" checked={props.checked} onClick={() => onChecked()} value={props.answer.text}>{props.answer.text}</Radio>
                    :
                    props.answer.type == 'NUMBER EACH' ?
                        <InputNumber style={{alignSelf:'center'}} max={20} min={1} onChange={(e: any) => setAnswer(e?.toString())} ></InputNumber> :
                        (props.answer.type == 'CUSTOM' || props.answer.text == "Customise:") ?
                            <>
                                <Checkbox className="ProjectPageRadio" checked={props.checked} disabled={checkDisabled()}  onChange={() => onChecked()}>Custom answer</Checkbox>
                                <Input className="customAnswerInput" onChange={(e) => setAnswer(e.target.value)} disabled={!props.checked || checkDisabled()} placeholder="Enter answer"></Input>
                            </> :
                            (props.answer.type == 'MULTI - NQ ONE' || props.answer.type == 'MULTI - NQ EACH') || props.isLeaveAsItIs ?
                                <Checkbox className="ProjectPageRadio" checked={props.checked} disabled={checkDisabled()} onChange={() => onChecked()}>{props.answer.text}</Checkbox> :
                                <div></div>

            }
        </>
    )
}