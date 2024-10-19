import { App, Button, Spin, Table, TableProps } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosNonAuth } from "../../lib/axios";
import './styles.css'
import {jsPDF} from 'jspdf'
import { useReactToPrint } from 'react-to-print';
import { Header } from "../../components/Header";
import { TreeIE, TreeLeafIE } from "../../types";
import { Excel } from 'antd-table-saveas-excel';
import autoTable from 'jspdf-autotable'



interface ProjectViewIE extends TreeIE{
    name:string
}
export const ProjectView:React.FC = () =>{
    let navigate = useNavigate()
    let params = useParams()
    const [data, setData] = useState<ProjectViewIE>()
    const { message, modal, notification } = App.useApp();
    const queried = useRef(false);
    const pdfRef = useRef(null);
    const printRef = useRef(null);

    useEffect(()=>{
        if (!queried.current) {
           queried.current = true;
           axiosNonAuth.post('get_answers/',{project_id:params.id} ).then((r) =>{
                setData(r.data)
            })
        }
    })

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
      });

    const onPrintClick = () =>{
        handlePrint()
    }
    const onLinkClick = () =>{
        message.success('Link copied to clipboard!')
        navigator.clipboard.writeText(window.location.href)
    }
    const onShareClick = () =>{
        message.success('Link sended!')
    }



    const onFileClick = () =>{
        message.success('File downloaded!')

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format:'a4',
        });

        pdf.setFont('Inter-Regular', 'normal', 400);

        pdf.html(pdfRef.current as any, {
            margin: 15,
            callback: function (doc) {
              doc.save(data?.name + '.pdf');
            }
         });    
    }


    const onMailClick = () =>{
        
    }
    const onDownloadClick = () =>{
        onFileClick()
    }

    const onExcelClick = () =>{

        const columnsLocal = [
            {
              title: 'Name',
              dataIndex: 'name',
              width: 100,
              excelRender: (value:any, row:any, index:any) => {
                  return {
                    children: value,
                    __style__: {
                        v: 'center',
                        h: 'center',
                        bold:true,
                    },
                  };
            }
            },
            {
              title: 'Text',
              dataIndex: 'text',
              width: 250,
              excelRender: (value:string, row:any, index:any) => {
                  let lValue = value.replaceAll('<strong>', '')
                  lValue = lValue.replaceAll('</strong>', '')
                  lValue = lValue.replaceAll('<br/>', String.fromCharCode(10))
                  return {
                    children: lValue,
                    __style__: {
                      v: 'center',
                      bold: !value.includes('*') || value.includes('<strong>'),
                      wrapText:true,
                      height:2,
                    },
                  };
                }
            },
            {
                title:'Quantity',
                dataIndex: 'quantity',
                width: 75,

            },
            {
                title:'Price',
                dataIndex: 'price',
                width: 75,

            },
            {
                title: 'Comment', 
                dataIndex: 'comment',
                width: 150,
            }
        ]

        let localDataSource =  [
            {...data?.property_type, key:'1'},
            {...data?.project_type, key:'2'},
        ]
        if (data != undefined){
            localDataSource = [...localDataSource, ...data?.list_of_work.text.split('<br/>').map((value:string, index:number)=>{
                let lValue = value.replaceAll('<div>', '')
                lValue = lValue.replaceAll('</div>', '')
                lValue = lValue.replaceAll('&emsp;', '  ')
                
                return {
                    name: index == 0? data?.list_of_work.name : '',
                    text: lValue, 
                    key: index + 3,
                }}) as any]
        }

        const excel = new Excel();
        excel
            .addSheet('List of work')
            .addColumns(columnsLocal as any)
            .addDataSource(localDataSource)
            .saveAs(data?.name + '.xlsx');
    }
    
    let dataSource = [
        {...data?.property_type, key:'1'},
        {...data?.project_type, key:'2'},
    ]
    if (data != undefined){
        dataSource = [...dataSource, ...data?.list_of_work.text.split('<br/>').map((value:string, index:number)=>{
            return {
                name: data?.list_of_work.name,
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
        {
            title:'Quantity'
        },
        {
            title:'Price'
        },
        {
            title: 'Comment',
            render: (text:string) =>  <div className="commentCell"></div>,

        }
    ]


    return <div className="ProjectView">
        <Header isAuth={localStorage.getItem('token') == undefined? false:true}></Header>
        <div className="goToProjects" onClick={()=>navigate('/')}>Go to other projects</div>
        
        <div className="ProjectViewButtonWrapper">
            <div className="ProjectViewButtonWrapperLeft">
                <Button onClick={()=>onPrintClick()} className="ProjectViewButton"><img src='/icons/print.svg'/></Button>
                <Button onClick={()=>onLinkClick()} className="ProjectViewButton"><img src='/icons/link.svg'/></Button>
                <a onClick={()=>onShareClick()} target='_blank' href={'https://wa.me/?text=' + '\n I am sharing with you my home renovation project created in ' + window.location.href }>
                <Button  className="ProjectViewButton"><img src='/icons/share.svg'/></Button>
                </a>
                <Button onClick={()=>onExcelClick()} className="ProjectViewButton"><img src='/icons/file.svg'/></Button>
                <Button onClick={()=>onMailClick()} className="ProjectViewButton"><img src='/icons/mail.svg'/></Button>
            </div>

            <div className="ProjectViewButtonWrapperRight">
                <Button onClick={()=>onDownloadClick()} className="ProjectViewButton" type="primary"><img src='/icons/download.svg'/></Button>
            </div>

        </div>
        <div  className="ProjectViewCard">
                    <div> {data?.name}</div>
                    {
                        data == undefined? <Spin></Spin>:
                        <Table  bordered style={{'width':'100%'}} pagination={false}
                        dataSource={dataSource as any} columns={columns}/>

                    }
        </div>
        <div style={{display:'none'}} >
            <div  ref={pdfRef} className="pdfContent">
                <div className="pdfHeader">
                    Project ::: {data?.name}
                </div>
                <div className="pdfContentWrapper">
                    {
                        data == undefined? <Spin></Spin>:
                        <Table bordered size="small"  pagination={false} dataSource={dataSource as any} columns={columns}/>
                    }
                </div>
               
            </div>

            <div  ref={printRef} className="printContent">
                <div className="printHeader">
                    Project ::: {data?.name}
                </div>
                <div className="printContentWrapper">
                
                    {
                        data == undefined? <Spin></Spin>:
                        <Table bordered size="small"  pagination={false} dataSource={dataSource as any} columns={columns}/>
                    }
                </div>
               
            </div>
        </div>
    </div>
}