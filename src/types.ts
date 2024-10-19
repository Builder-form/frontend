import React from "react"


export interface ProjectIE{
    name:string,
    id:string,
    last_edit:string,
    created:string,
    progress: number
}


export interface AnswerIE{
    text:string,
    id:string,
    type:string,
    question_instance:string;
}
export interface TerminIE{
    qid:string,
    termin:string,
    description: string
}

export interface QuestionIE{
    qid:string,
    project:string,
    params:string,
    parent:string,
    text:string,
    pk:Number,
    answers:AnswerIE[]
    termins:TerminIE[]
}

export interface TreeLeafIE{
    name:string,
    text:string,
}

export interface TreeIE{
    property_type: TreeLeafIE,
    list_of_work: TreeLeafIE,
    project_type: TreeLeafIE
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

