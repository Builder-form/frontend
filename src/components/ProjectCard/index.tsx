import React from "react";
import './styles.css'
import { ProjectIE } from "../../types";
import { Divider, Flex, Tag } from 'antd';
import { useNavigate } from "react-router-dom";
import { axios } from "../../lib/axios";
import { App, Button, Space } from 'antd';

export const ProjectCard:React.FC<ProjectIE> = (props) =>{
    let last_edit =  new Date(Number(props.last_edit)*1000)
    let navigate = useNavigate()
    const { message, modal, notification } = App.useApp();

    const onDeleteClick = () =>{
        modal.confirm({
            title: 'DELETE',
            content: 'Are you sure you want to delete this project?',
            okText: 'OK',
            cancelText: 'Cancel',
            onOk: ()=>axios.delete('/project/'+props.id+'/').then((data)=>{
                window.location.reload()
            })

        });
        
    }
    
    const onContinueClick = () => {
        navigate('/project/'+props.id)
    }

    const onViewClick = () =>{
        navigate('project/'+props.id+'/view')
    }

    const short_description = props.short_description == undefined || props.short_description == ''? "You haven't answered any questions yet. Start answering soon!" : props.short_description.replaceAll('<strong>', '<span  class="projectDescrH1">').replaceAll('</strong>', '</span>')

    console.log(short_description)
    return <div className="ProjectCard">
        <img className="ProjectPic" src='/pictures/mock.png'></img>
        <div className="ProjectCardInfo">
            <div className="ProjectCardHeader">
                <div className="ProjectBtnWrapper">
                    <div className="ProjectName">{props.name}</div>
                    <div className="ProjectLastEdit">last edit {last_edit.toLocaleString()}</div>
                </div>
                <div className="ProjectBtnWrapper">
                    {
                        props.progress == 100? <Tag color="#52C41A">Completed</Tag>:
                        props.progress <= 1?       <Tag color="#1890FF">New</Tag>:<Tag color="#1890FF">{props.progress}% progress</Tag>
                    }
                    <img className="delBtn" onClick={()=>onDeleteClick()} src='/icons/del.svg'/>
                </div>
            </div>
            <div className="projectDescription" dangerouslySetInnerHTML={{ __html: short_description}}>
               
                {/* <span className='projectDescrH1'>House type</span> <br/>
                    &emsp;-Detached<br/>
                <span className='projectDescrH1'>House Project type</span><br/>
                    &emsp;-House extensions<br/>
                <span className='projectDescrH1'>Type of House refurbishment</span><br/>
                    &emsp;-Refurb with minor non structural alterations<br/> */}
            </div>
            <div className="projectFooter">
                    {
                        props.progress == 100? 
                        <Button type="primary" onClick={()=>onViewClick()}>View</Button>
                        :
                        <Button type="primary"  onClick={()=>onContinueClick()}>Continue</Button>
                    }
            </div>
        </div>
    </div>
}