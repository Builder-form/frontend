import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/Button'
import { TestIE } from '../../types'
import './styles.css'

import '../../index.css'
import { axios, idUpdate } from '../../lib/axios'

export const Test:React.FC = () =>{
    const [data, setData] = useState<TestIE>({
        ear_level:0,
        eye_level:0,
        move_level:0,
        theme:0,
        text_size:18,
    })
    let params = useParams()
    let navigate = useNavigate()


    idUpdate()

    const skipTest = (data:TestIE) =>{
        idUpdate()

        axios.post('form-fill/', data).then((r)=>{
            navigate('/')
            window.location.reload()
        })
        
    }


    const questions = {
        eye:{
            1:{ 

                question:'Выберите наиболее подходящий ответ',
                answer:[
                    {
                        title:'Среднее нарушение зрения:',
                        text:'Трудности при чтении обычного текста или распознания цветов.Ношу очки или контактные линзы.'
                    },
                    {
                        title:'Сильное нарушение зрения',
                        text:'Серьезные трудности распознания деталей. Зависимость от вспомогательных технологий.'
                    },
                    {
                        title:'Частичная или полная слепота:',
                        text:'Отсутствие зрительных восприятий. Использование шрифта Брайля и вспомогательных технологий.'
                    }
                ]
            }
            ,
            2:{
                question:'Выберите наиболее читабельный текст',
                title:'Куда сходить?',
                text:'Лучшие достопримечательности, выставки, концерты, театры',
                fontSize:[18,20,22]
            },
            3:{
                question:'Выберите наиболее читабельную тему',
            }
        },
        ear:{ 
            question:'Выберите наиболее подходящий ответ',
            answer:[
                {
                    title:'Средняя потеря слуха:',
                    text:'Трудности с восприятием речи на обычной громкости'
                },
                {
                    title:'Тяжелая потеря слуха:',
                    text:'Потребность в слуховых аппаратах или кохлеарном имплантате.'
                },
                {
                    title:'Глубокая потеря слуха (глухота):',
                    text:'Использование жестового языка'
                }
            ]
        },
        moves:{
            question:'Выберите наиболее подходящий ответ',
            answer:[
                {
                    title:'Частичная самостоятельность',
                    text:'Могу ходить самостоятельно при помощи трости, костылей, ходунков.'
                },
                {
                    title:'Ограниченная самостоятельность',
                    text:'Использую инвалидную коляску самостоятельно.'
                },
                {
                    title:'Минимальная самостоятельность',
                    text:'Полностью завишу от инвалидной коляски и помощи другого человека для передвижения.'
                }
            ]
        }
    }

    
    
    console.log(data)

    return <div className='test_page'>
        {
            params.params == 'start'? <>
            <div className='test_header'>
            <img className='gear_1' src='/icons/gear1.svg'></img>
            <div className='skip_test' onClick={()=>skipTest(data)}>пропустить тест</div>
            <img className='gear_2' src='/icons/gear2.svg'></img>
            <div className='test_header_text'>
                Отлично!<br></br>
                Теперь настроим приложение под Вас
            </div>
        </div> 
        <div className='test_footer'>
            <div className='test_footer_text'>
                Чтобы приложение МАЯК могло максимально соответствовать вашим потребностям, мы предлагаем пройти короткое тестирование. Это поможет настроить приложение именно под вас.
            </div>

            <Button styles={{'justifyContent':'flex-end'}} state='primary' onClick={()=>{navigate('/auth/onBoarding/eye_0'); setData({...data, ear_level:1})}}><>Начать <img src='/icons/arrow_next.svg'></img></></Button>
        </div>
        </>:''
        }

        {
            params.params == 'eye_0'?
             <div className='test_question'>
                <div className='test_question_header'>
                    <img className='test_question_pic' src='/pictures/eye_pic.svg' />
                </div>
                <div className='test_question_footer'>
                    <div className='test_question_footer_text'>Испытываете ли вы трудности со зрением?</div>
                    <div className='test_question_footer_btnwrapper'>
                        <Button size='large' state='red' onClick={()=>navigate('/auth/onBoarding/ear_0')}>Нет</Button>
                        <Button size='large' onClick={()=>navigate('/auth/onBoarding/eye_1')}>Да</Button>
                    </div>
                    <Button size='large' state='none' onClick={()=>navigate(-1)}>Назад</Button>
                </div>
            </div>
            
            :

            params.params?.includes('eye')? 
            <div className='test_question'>
                <div className='test_question_header'></div>
            <div className='test_question_footer'>
               <div className='test_question_text'>
                    {
                        questions.eye[params.params.split('_')[1] as '1'|'2'|'3'].question
                    }
               </div>
               <div className='test_question_answers_wrapper'>
                    {
                        params.params.split('_')[1] == '1'? 
                       <>
                        {
                            questions.eye[1].answer.map((value, index)=>
                            <div onClick={()=>{setData({...data, 'eye_level':(index+1) as any}); navigate('/auth/onBoarding/eye_2')}} className='test_question_answer'>
                                <div className='test_question_answer_title'>{value.title}</div>
                                <div className='test_question_answer_text'>{value.text}</div>
                            </div>
                            )
                        }
                       </>
                        :
                        params.params.split('_')[1] == '2'?
                        <>
                            {
                                questions.eye[2].fontSize.map((value)=>
                                <div onClick={()=>{setData({...data, 'text_size': value as any}); navigate('/auth/onBoarding/eye_3')}} className='test_question_answer'>
                                    <div style={{'fontSize':value}} className='test_question_answer_title'>Куда сходить?</div>
                                    <div style={{'fontSize':value}} className='test_question_answer_text'>Лучшие достопримечательности, выставки, концерты, театры</div>
                                </div>
                                )
                            }
                        </>
                        :
                        params.params.split('_')[1] == '3'?
                        <div className='test_question_theme_card_wrapper'>
                            {
                                ['base_theme', 'green_theme', 'orange_theme','monochrome_theme'].map((value, index)=>
                                    <div onClick={()=>{setData({...data, 'theme': index as any}); navigate('/auth/onBoarding/ear_0')}} className={'test_question_theme_card' + ' ' + value}>
                                        <div className='test_question_theme_card_header'>
                                            Маршрут
                                        </div>
                                        <div className='test_question_theme_card_content'>
                                            Ваш маршрут проложен
                                            <img src={'/icons/nav_'+value+'.svg'}></img>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        :''
                    }

               </div>
               <Button size='large' state='none' onClick={()=>navigate(-1)}>Назад</Button>
            </div>
        </div> :''
        }


        {
            params.params == 'ear_0'?
             <div className='test_question'>
                <div className='test_question_header'>
                    <img className='test_question_pic' src='/pictures/ear_pic.svg' />
                </div>
                <div className='test_question_footer'>
                    <div className='test_question_footer_text'>Испытываете ли вы трудности со слухом?</div>
                    <div className='test_question_footer_btnwrapper'>
                        <Button size='large' state='red' onClick={()=>navigate('/auth/onBoarding/move_0')}>Нет</Button>
                        <Button size='large' onClick={()=>navigate('/auth/onBoarding/ear_1')}>Да</Button>
                    </div>
                    <Button size='large' state='none' onClick={()=>navigate(-1)}>Назад</Button>
                </div>
            </div> 
            :
            params.params == 'ear_1'?

            <div className='test_question'>
                <div className='test_question_header'></div>
                <div className='test_question_footer'>
                    <div className='test_question_text'>
                            Выберите наиболее подходящий ответ
                    </div>
                    <div className='test_question_answers_wrapper'>
                            {
                            
                                
                                    questions.ear.answer.map((value, index)=>
                                    <div onClick={()=>{setData({...data, 'ear_level':(index+1) as any}); navigate('/auth/onBoarding/move_0')}} className='test_question_answer'>
                                        <div className='test_question_answer_title'>{value.title}</div>
                                        <div className='test_question_answer_text'>{value.text}</div>
                                    </div>
                                    )
                            }
                    </div>
                    <Button size='large' state='none' onClick={()=>navigate(-1)}>Назад</Button>

            </div>
        </div>
        :
        ""
        }
        {
            params.params == 'move_0'?
             <div className='test_question'>
                <div className='test_question_header'>
                    <img className='test_question_pic' src='/pictures/move_pic.svg' />
                </div>
                <div className='test_question_footer'>
                    <div className='test_question_footer_text'>Испытываете ли вы трудности в передвижении?</div>
                    <div className='test_question_footer_btnwrapper'>
                        <Button size='large' state='red' onClick={()=>skipTest(data)}>Нет</Button>
                        <Button size='large' onClick={()=>navigate('/auth/onBoarding/move_1')}>Да</Button>
                    </div>
                    <Button size='large' state='none' onClick={()=>navigate(-1)}>Назад</Button>
                </div>
            </div> 
            :
            params.params == 'move_1'?

            <div className='test_question'>
                <div className='test_question_header'></div>
                <div className='test_question_footer'>
                    <div className='test_question_text'>
                        Выберите наиболее подходящий ответ
                    </div>
                    <div className='test_question_answers_wrapper'>
                            {
                                    questions.moves.answer.map((value, index)=>
                                    <div onClick={()=>{setData({...data, 'move_level':(index+1) as any}); skipTest({...data, 'move_level':(index+1) as any});}} className='test_question_answer'>
                                        <div className='test_question_answer_title'>{value.title}</div>
                                        <div className='test_question_answer_text'>{value.text}</div>
                                    </div>
                                    )
                            }
                    </div>
                    <Button size='large' state='none' onClick={()=>navigate(-1)}>Назад</Button>

            </div>
        </div>
        :
        ""
        }
            

      
        
        

    </div>
}