import { App, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentComponent from "../../components/paymentComponent";
import { axios, userApi } from "../../lib/axios";
import './styles.css'

export const Account = () => {
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        phone_number: '',
    })

    const [projects, setProjects] = useState({
        projects_created: 0,
        projects_completed: 0,
    })


    const queried = useRef(false);
    const { message, modal, notification } = App.useApp();

    useEffect(() => {
        if (!queried.current) {
            queried.current = true;

            userApi.get('user_self_info/').then((r) => {
                setData(r.data)
            }).catch((r) => navigate('/login'))

            axios.get('user_projects/').then((r) => {
                setProjects(r.data)
            }).catch((r) => {
                console.log(r)
                message.error('Error getting projects')
            })
        }
    })

    let navigate = useNavigate()

    const logout = () => {
        modal.confirm({
            title: 'LOGOUT',
            content: 'Are you sure you want to logout?',
            okText: 'OK',
            cancelText: 'Cancel',
            onOk: () => {
                localStorage.clear()
                navigate('/login')
            }
        })
    }

    return <div className="accountPage">
        <div className="goToProjects" onClick={() => navigate('/')}>Go to projects</div>
        <div className="accountCard">
            <div className="accountCardInfo">
                <div className="accountCardInfoHeader">Account</div>
                <div>First Name: {data.first_name}</div>
                <div>Last Name: {data.last_name}</div>
                <div>E-mail: {data.username}</div>
                <div>Phone number: {data.phone_number}</div>
                <Button style={{marginTop: 'auto'}} type="primary" onClick={() => navigate('/register')} size="large">Change profile</Button>
                <Button onClick={() => logout()} size="large">Logout</Button>
            </div>
            <div className="accountCardInfo">
                <div className="accountCardInfoHeader">Projects info<br></br></div>
                <div>Projects created: {projects.projects_created}</div>
                <div>Projects completed: {projects.projects_completed}</div>
            </div>
            <div className="accountCardInfo">
                <div className="accountCardInfoHeader">Payment info<br></br></div>
                <div className="accountInfoText">
                    You haven't added any cards. <br></br>
                    Let's add one.
                </div>

                <Button style={{marginTop: 'auto'}} type="primary" onClick={() => navigate('/project/create')} size="large">Create a new project</Button>
            </div>
        </div>
        <div className="accountCard">
            <div className="accountCardInfo">
                <div className="accountCardInfoHeader">Transactions History<br></br></div>
                <div>
                    <div className="accountInfoText">
                        You don't have any transactions
                    </div>
                </div>
            </div>
        </div>
    </div>
}