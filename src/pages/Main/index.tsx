import './styles.css'
import React, { useEffect, useRef, useState } from 'react'
import { Header } from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import { Button, Carousel, Spin } from 'antd';
import { axios } from '../../lib/axios'
import { ProjectCard } from '../../components/ProjectCard';
import { ProjectIE } from '../../types';


export const Main: React.FC = () => {

    let navigate = useNavigate()
    const [projects, setProjects] = useState<ProjectIE[]>()

    const queried = useRef(false);



    useEffect(() => {
        if (localStorage.getItem('token') == undefined) {
            navigate('/login')
        }
        if (!queried.current) {
            queried.current = true;
            axios.get('get_projects/').then((r) => {
                setProjects(r.data)
            }).catch((r) => {

            })
        }
    })

    return <div className='main_page'>
        <div className='projectWrapper'>
            <div className='mainHeaderWrapper'>
                <div className='mainHeader'>Projects</div>
                <Button onClick={() => navigate('/project/create')} size='large' type='primary'>Create a new project</Button>
            </div>
            {   
                projects == undefined ? <Spin></Spin> : 
                projects?.length == 0 ?
                    <div className='noProjects'>
                        You don't have any projects<br></br>
                        Let's create a new one!
                        <Button onClick={() => navigate('/project/create')} size='large' type='primary'>Create a new project</Button>
                    </div> :
                    projects?.map((project, index) => <ProjectCard
                        name={project.name}
                        id={project.id}
                        last_edit={project.last_edit}
                        created={project.created}
                        progress={project.progress}
                        short_description={project.short_description}
                    ></ProjectCard>)
            }
        </div>



    </div>
}