import { App, Button, Progress, Radio, Spin, Table, TableProps, Tooltip, Tree } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Answer } from "../../components/Answer";
import { axios } from "../../lib/axios";
import { QuestionIE, TreeIE, TreeLeafIE } from "../../types";
import './styles.css'
import { DownOutlined } from '@ant-design/icons';


export const ProjectPage: React.FC = () => {
    const { message, notification, modal } = App.useApp();

    const [currentQuestion, setCurrentQuestion] = useState<QuestionIE>()
    const [showModal, setShowModal] = useState(false)
    const [answers, setAnswers] = useState<{text:string, id:string}[]>([])
    const [progress, setProgress] = useState(0)
    const [questionNumber, setQuestionNumber] = useState(0)
    const [tree, setTree] = useState<TreeIE>({} as TreeIE)
    const MemoTooltip = Tooltip || React.memo(Tooltip);
    const queried = useRef(false);
    const params = useParams()
    let navigate = useNavigate()

    const treeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (localStorage.getItem('token') == undefined) {
            navigate('/login')
        }
        if (!queried.current) {
            queried.current = true;
            axios.post('current_question/', { project_id: params?.id }).then((r) => {
                setCurrentQuestion(r.data)
                setProgress(r.data.progress)
                setTree(JSON.parse(r.data.tree))
                setQuestionNumber(r.data.answered_questions)
                navigate('#' + r.data.qid)
                if (r.data.qid == 'END') {
                    navigate('/project/' + params.id + '/view')
                }
            })
        }
    })

    useEffect(() => {
        if (treeRef.current) {
            treeRef.current.scrollTo({
                top: treeRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [tree]);

    const clearData = () => {
        setAnswers([])
    }

    let dataSource = [
        { ...tree?.property_type, key: '1' },
        { ...tree?.project_type, key: '2' },
    ]
    if (tree?.list_of_work != undefined && tree?.list_of_work.text != '<strong>Project type detalisation:</strong> ') {
        dataSource = [...dataSource, ...tree?.list_of_work.text.split('<br/>').map((value: string, index: number) => {
            console.log(value)
            if (value.trim() == '') {
                return;
            }
            return {
                name: tree?.list_of_work.name,
                text: value,
                key: index + 3,
            }
        }) as any]
    }

    const columns: TableProps<TreeLeafIE>['columns'] = [
        {
            title: '№',
            dataIndex: 'key',
            align: 'center',
            render: (text: string) => <div className="numberCell">{text}</div>
        },
        {
            title: 'Name:',
            dataIndex: 'name',
            align: 'center',
            onCell: (_: any, index: any) => {
                if (index === 2) {
                    return { style: { verticalAlign: 'top', minWidth: '120px' }, rowSpan: dataSource.length - 2 };
                }

                if (index > 2) {
                    return { style: { verticalAlign: 'top' }, colSpan: 0 };
                }
                return { style: { verticalAlign: 'top' } }; // Выравнивание по верхнему краю
            },
        },
        {
            title: 'Description',
            dataIndex: 'text',
            render: (text: string) => <div dangerouslySetInnerHTML={{ __html: text }} />,
        },
    ]

    const isLeaveAsItAs = () => {
        return answers.some((item: any) => item.text == "LEAVE AS IT IS:" || item.text == "Leave as it is")
    }
    const isLeaveAsItAsString = (text: string) => {
        return text == "LEAVE AS IT IS:" || text == "Leave as it is"
    }
    const onChecked = (data: { text: string, id: string, checked: boolean }) => {
        console.log(data)
        if (isLeaveAsItAsString(data.text)) {
            onCheckedRadio(data)
            return;
        }
        if (data.checked) {
            if (answers.some((ans: any) => ans?.id === data.id)) {
                console.log('here')
                const updatedAnswers = answers.map((item: any) => {
                    if (item.id === data.id) {
                        return { ...item, text: data.text };
                    }
                    return item;
                });
                setAnswers(updatedAnswers as any);
                return;
            }
            setAnswers([{ text: data.text, id: data.id, question_instance: currentQuestion?.pk }, ...answers] as any)
        } else {
            // let answer = {text:data.text, id:data.id}
            // let new_answers = answers
            // new_answers.splice(new_answers.indexOf(answer as never), 1)
            setAnswers(answers => answers.filter((item: any) => item.id !== data.id));

        }
    }

    const onCheckedRadio = (data: { text: string, id: string, checked: boolean }) => {
        if (data.checked) {
            setAnswers([{ text: data.text, id: data.id, question_instance: currentQuestion?.pk }] as any)
        } else {
            setAnswers([]);
        }
    }
    const onNextClick = () => {
        if (answers.length == 0) {
            message.info('Please select an answer')
            return;
        }
        setCurrentQuestion(undefined)
        axios.post('answer_question/', { project_id: params?.id, answers: answers }).then((r) => {
            clearData()
            setCurrentQuestion(r.data)
            setProgress(r.data.progress)
            setTree(JSON.parse(r.data.tree))
            setQuestionNumber(r.data.answered_questions)
            navigate('#' + r.data.qid)
            if (r.data.qid == 'END') {
                navigate('/project/' + params.id + '/view')
            }
        }).catch((e) => {
            message.error('Something went wrong')
        })
    }
    const onBackClick = () => {
        setCurrentQuestion(undefined)
        axios.post('/project/back/', { project_id: params?.id }).then((r) => {
            clearData()

            console.log(r.data)
            setCurrentQuestion(r.data)
            setProgress(r.data.progress)
            setTree(JSON.parse(r.data.tree))
            setQuestionNumber(r.data.answered_questions)
            navigate('#' + r.data.qid)
            if (r.data.qid == 'END') {
                navigate('/project/' + params.id + '/view')
            }
        }).catch((e) => {
            message.error('Something went wrong')
        })
    }

    const renderQuestionText = (text: string) => {
        if (text && text.includes('-')) {
            const parts = text.split('-').map(part => part.trim()).filter(Boolean);
            const renderNested = (parts: string[]): JSX.Element => {
                if (parts.length === 0) return <></>;
                const [head, ...rest] = parts;
                return (
                    <ul className="hierarchy">
                        <li>
                            {head}
                            {rest.length > 0 && renderNested(rest)}
                        </li>
                    </ul>
                );
            };
            return renderNested(parts);
        }
        return <span>{text}</span>;
    };


    return <div className="ProjectPage">

        {
            showModal ? <div className="modalBackground">
                <div className="modalCard">
                    <img className="modalCross" onClick={() => setShowModal(false)} src='/icons/cross.svg'></img>
                    {/* <div className="ProjectPageHeader">Question #{currentQuestion?.qid.slice(1, currentQuestion?.qid.length)} </div> */}
                    <div className="ProjectPageHeader">Question {currentQuestion?.number_id}</div>
                    <div className="modalHeader">Termins</div>
                    <div className="modalsTermins">
                        {
                            currentQuestion?.termins.map((value, index) => <div className="modalText">
                                <span className="blackModalText">{value.termin} — </span>
                                {value.description}
                            </div>)
                        }
                    </div>
                    <Button size="large" onClick={() => setShowModal(false)}>Close</Button>
                </div>
            </div> : <></>
        }

        <div className="goToProjects" onClick={() => navigate('/')}>Go to other projects</div>
        <Progress strokeColor={'#AA8066'} percent={progress} />
        <div className="ProjectPageHeader">
        Question {questionNumber + 1}
        {/* {currentQuestion?.number_id}  */}
            {/* Question #{currentQuestion?.qid.slice(1, currentQuestion?.qid.length)} */}
            
        </div>

        <div className="ProjectPageTreeWrapper">
            <div className="ProjectTree" ref={treeRef} style={{ whiteSpace: 'pre-line' }}>
                <Table bordered size="small" pagination={false} dataSource={dataSource} columns={columns} />
            </div>
            <div className="ProjectPageMainWrapper">
                <div className="ProjectPageQuestion" >
                    {currentQuestion?.termins != undefined && currentQuestion?.termins.length > 0 ?
                        <img className="terminBtn" onClick={() => setShowModal(true)} src='/icons/termin.svg'></img>
                        :
                        <div></div>
                    }
                    &nbsp;
                    {renderQuestionText(currentQuestion?.text ?? '')}

                </div>
                {
                    currentQuestion?.answers == undefined ? <Spin></Spin>
                    :
                        <div className="ProjectPageQuestionWrapper">
                    {
                        currentQuestion?.answers[0].type == 'SINGLE' ?

                            <Radio.Group  value={answers.length > 0 ? answers[0].text : undefined } className="ProjectPageQuestionWrapper">
                                {currentQuestion?.answers.map((value, index) =>
                                    // <Answer
                                    //     onChecked={(e) => { onCheckedRadio(e); }}
                                    //     answer={value}
                                    //     checked={isLeaveAsItAsString(value.text) || answers.some((ans: any) => ans?.id === value.id)} // Устанавливаем checked
                                    // />
                                    <Answer checked={answers.some((ans: any) => ans?.id === value.id)} onChecked={(e) => { onCheckedRadio(e); }} answer={value} ></Answer>
                                )}
                            </Radio.Group>
                            :
                            currentQuestion?.answers.map((value, index) =>
                                <Answer
                                    disabled={isLeaveAsItAs()} // Отключаем, если Leave As It Is активен
                                    onChecked={(e) => onChecked(e)}
                                    answer={value}
                                    isLeaveAsItIs={isLeaveAsItAsString(value.text)}
                                    checked={value.type == 'NUMBER EACH' ? true : answers.some((ans: any) => ans?.id === value.id)}
                                />)
                    }
                </div>
                }
                <div className="ProjectPageBtnsWrapper">
                    {
                        currentQuestion?.qid == 'Q1' ? <div></div>
                            :
                            <Button onClick={() => onBackClick()} size="large" >Back</Button>
                    }
                    <Button onClick={() => onNextClick()} size="large" type="primary">Next</Button>
                </div>
            </div>

        </div>

    </div>
}