import { Button, Progress, Radio, Spin, Table, TableProps, Tooltip, Tree } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Answer } from "../../components/Answer";
import { axios } from "../../lib/axios";
import { QuestionIE, TreeIE, TreeLeafIE } from "../../types";
import './styles.css'
import { DownOutlined } from '@ant-design/icons';


export const ProjectPage:React.FC = () =>{
    const [currentQuestion, setCurrentQuestion] = useState<QuestionIE>()
    const [showModal, setShowModal]  = useState(false)
    const [answers, setAnswers] = useState([])
    const [progress, setProgress] = useState(0)
    const [tree, setTree] = useState<TreeIE>({} as TreeIE)
    const MemoTooltip = Tooltip || React.memo(Tooltip);
    const queried = useRef(false);
    const params = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
        if (localStorage.getItem('token') == undefined){
                navigate('/login')
        }
        if (!queried.current) {
           queried.current = true;
           axios.post('current_question/', {project_id : params?.id}).then((r) =>{
                setCurrentQuestion(r.data)
                setProgress(r.data.progress)
                setTree(JSON.parse(r.data.tree))
                navigate('#' + r.data.qid)
                if (r.data.qid == 'END'){
                    navigate('/project/'+params.id+'/view')
                }
            })
        }
    })
    

    let dataSource = [
        {...tree?.property_type, key:'1'},
        {...tree?.project_type, key:'2'},
    ]

    if (tree?.list_of_work != undefined){
        dataSource = [...dataSource, ...tree?.list_of_work.text.split('<br/>').map((value:string, index:number)=>{
            return {
                name: tree?.list_of_work.name,
                text: value, 
                key: index + 3,
            }}) as any]
    }

    const columns: TableProps<TreeLeafIE>['columns'] = [
        {
            title: '№',
            dataIndex: 'key',
            render: (text:string) => <div className="numberCell">{text}</div>
        },
        {
          title: 'Name',
          dataIndex: 'name',
          onCell: (_:any, index:any) => {
            if (index === 2) {
              return { rowSpan: dataSource.length - 2};
            }
           
              if (index > 2) {
                return { colSpan: 0 };
              }
            return {};
          },
        },
        {
          title: 'Text',
          dataIndex: 'text',
          render: (text:string) =>  <div dangerouslySetInnerHTML={{ __html: text}} />,
        },
    ]

    const onChecked = (data:{text:string, id:string, checked:boolean}) =>{
        if (data.checked){
            setAnswers([{text:data.text, id:data.id, question_instance:currentQuestion?.pk}, ...answers] as any)
        } else{
            let answer = {text:data.text, id:data.id}
            let new_answers = answers
            new_answers.splice(new_answers.indexOf(answer as never), 1)
        }
    }

    const onNextClick = () =>{
        axios.post('answer_question/', {project_id : params?.id, answers:answers}).then((r) =>{
            console.log(r.data)
            window.location.reload()
        })
    }
    const onBackClick = () =>{
        axios.post('/project/back/', {project_id : params?.id}).then((r) =>{
            console.log(r.data)
            window.location.reload()
        })
    }


    return <div className="ProjectPage">

        {
            showModal? <div className="modalBackground">
                <div className="modalCard">
                    <img className="modalCross" onClick={()=>setShowModal(false)} src='/icons/cross.svg'></img>
                    <div className="ProjectPageHeader">Question #{currentQuestion?.qid} </div>
                    <div className="modalHeader">Termins</div>
                    <div className="modalsTermins">
                        {
                            currentQuestion?.termins.map((value, index)=><div className="modalText">
                                <span className="blackModalText">{value.termin} — </span>
                                {value.description}
                            </div>)
                        }
                    </div>
                    <Button size="large" onClick={()=>setShowModal(false)}>Close</Button>
                </div>
            </div> : <></>
        }

        <div className="goToProjects" onClick={()=>navigate('/')}>Go to other projects</div>
        <Progress strokeColor={'#AA8066'} percent={progress} />
        <div className="ProjectPageHeader">
            Question #{currentQuestion?.qid} 
            {currentQuestion?.termins != undefined && currentQuestion?.termins.length > 0? 
                <img className="terminBtn" onClick={()=>setShowModal(true)}  src='/icons/termin.svg'></img>
                
            :
        <div></div>}
        </div>
        
        <div className="ProjectPageTreeWrapper">
            <div className="ProjectTree" style={{whiteSpace:'pre-line'}}>
                <Table pagination={false} dataSource={dataSource} columns={columns} />;

            </div>
            <div className="ProjectPageMainWrapper">
                <div className="ProjectPageQuestion" >{currentQuestion?.text}</div>
                <div className="ProjectPageQuestionWrapper">
                    {
                        currentQuestion?.answers[0].type == 'SINGLE'?
                        <Radio.Group className="ProjectPageQuestionWrapper">
                            {currentQuestion?.answers.map((value, index)=>
                            <Answer onChecked={(e)=>onChecked(e)} answer={value} ></Answer>)}
                        </Radio.Group>
                        :
                        currentQuestion?.answers.map((value, index)=>
                        <Answer onChecked={(e)=>onChecked(e)} answer={value} ></Answer>)

                    }
                </div>   
                <div className="ProjectPageBtnsWrapper">
                    {
                        currentQuestion?.qid == 'Q1'? <div></div>
                        :
                        <Button onClick={()=>onBackClick()} size="large" >Back</Button>
                    }
                    <Button onClick={()=>onNextClick()} size="large" type="primary">Next</Button>
                </div>
            </div>
            
        </div>
        
    </div>
}