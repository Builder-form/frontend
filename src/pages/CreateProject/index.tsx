import { App, Button, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "../../lib/axios";
import './styles.css'
import PaymentComponent from "../../components/paymentComponent";
import { ProjectIE } from "../../types";

export const CreateProject: React.FC = () => {
    const [name, setName] = useState('')
    const { message, notification, modal } = App.useApp();

    let navigate = useNavigate()
    
    const onCreate = (data: any, actions: any) =>{
        console.log('DATA ACTIONS', data, actions)
        axios.post('create_payment/', {name:localStorage.getItem('project_name')}).then((data)=>{
            navigate('/project/'+data.data.id)
        }).catch((err) =>{
            message.error('Please buy accept to project')
            navigate('/account')
        })
    }

    // const onCreate = (data: ProjectIE) => {
    //     navigate('/project/' + data.id)
    // }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value)
        localStorage.setItem('project_name', e.target.value)
    }

    return <div className="CreateProject">
        <div className="goToProjects" onClick={() => navigate('/')}>Go to other projects</div>
        <div className="CreateProjectHeader">Creating a new project</div>
        <div className="CreateProjectText">
            You are about to take a short, carefully designed survey that will help you create a schedule of work and provide a clear understanding of the next steps. The survey takes approximately 30 minutes to complete. You can pause and return to it at any time. Upon completion, you will receive a professional schedule of work, which you can print or send by email to share with your builders and architects. We hope that our service helps make your interactions as productive as possible, saving you both time and money. Good luck with your project!
        </div>
        <div className="CreateProjectBtnsWrapper">
            <Input size="large" className="CreateProjectInput" value={name} onChange={(e) => onNameChange(e)} placeholder="Enter project name"></Input>
            <PaymentComponent onCreate={(data: any, actions: any)=>onCreate(data, actions)} project_name={name}></PaymentComponent>

            {/* <Button onClick={()=>onCreate()} className="CreateProjectBtn" type="primary" size="large">Next</Button> */}
        </div>


    </div>
}