import { App, Button, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, tokenUpdate } from "../../lib/axios";
import './styles.css'

export const EmailCode: React.FC = () => {
    const { message, modal, notification } = App.useApp();


    const [code, setCode] = useState('')
    const [isCodeValid, setIsCodeValid] = useState(true);

    let navigate = useNavigate()

    const onSendCode = () => {
        if (code.length == 4) {
            auth.post('/auth/', { email: localStorage.getItem('email'), code: Number(code) }).then((r) => {
                message.open({
                    type: 'success',
                    content: 'Welcome!',
                });
                localStorage.setItem('token', r.data.jwt_token)
                tokenUpdate()
                navigate('/')
                window.location.reload()
            }).catch((r: any) => {
                if (r.response.status == 400) {
                    setIsCodeValid(false)
                    message.open({
                        type: 'error',
                        content: 'Incorrect code',
                    });
                }
                else {
                    message.open({
                        type: 'error',
                        content: 'Internal Server Error',
                    });
                }
            })
        }
    }


    const getCode = () => {
        auth.post(
            '/sign-in/',
            {
                email: localStorage.getItem('email'),
            }
        ).then(
            (r) => {
                if (r.status == 200) {
                    message.open({
                        type: 'success',
                        content: 'Code sended!',
                    })
                }
            }
        ).catch((r) => {
            if (r.response.status == 400) {
                message.open({
                    type: 'error',
                    content: 'Not enough time has passed to request the code again. Please try again in 1 minute.',
                });
            }
            else {
                message.open({
                    type: 'error',
                    content: 'Internal Server Error',
                });
            }
        })
    }


    return (
        <div className="emailCode">
            <div className="emailCodeCard">
                <img className="emailCardLogo" src='/icons/logo.svg'></img>
                <div className="emailCardDescr">We sent a message with a confirmation code to your <br></br> e-mail: {localStorage.getItem('email')}</div>
                <Input.OTP status={isCodeValid ? '' : 'error'} onInput={() => onSendCode()} size="large" className="codeInput" length={4} onChange={(e) => setCode(e)} />
                <div onClick={() => getCode()} className="sendCodeAgain">Send code again</div>
                <div className="emailCodeWrapper">
                    <Button size="large" className="emailButton" onClick={() => navigate(-1)}>Back</Button>
                    <Button size="large" type='primary' className="emailButton" onClick={() => onSendCode()}>Log in</Button>
                </div>
            </div>
        </div>
    )
}