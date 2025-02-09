import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import NavBar from '../Navigation/NavBar';
import Footer from '../Footer/Footer';
import { Lesson, Section, Course } from '@thoughtindustries/content/src/graphql/global-types';
import { Content } from '@thoughtindustries/content/src/graphql/global-types';
import { GeneralTopic } from '../Topics/GeneralTopic'

interface Topic {
    id: String
    title: String
}

function CourseComponent(props: { id: string }) {

    console.log("id is")
    console.log(props.id)

    const [access, setAccess] = useState(false)
    const [course, setCourse] = useState<Course>();
    const [pageIndex, setPageIndex] = useState(0);
    const [selectedPage, setSelectedPage] = useState<string>("641a8013-4213-49be-9783-60ccff32e85a");
    const [topics, setTopics] = useState<Topic[]>([])

    const course_query = gql`
    query CourseById($id: ID!) {
        CourseById(id: $id) {
            sections {
            title
            lessons {
                title
                  topics {
                  ...on TextPage {
                    title
                    id
                    type
                  }
                  ... on QuizPage {
                    title
                    id
                    type
                  }
                  ... on VideoPage {
                    title
                    id
                    type
                  }
                  ... on ScormPage {
                    title
                    id
                    type
                  }
                  ... on ListRollPage {
                    title
                    id
                    type
                  }
                }
            }
        }
      }
    }`

    const { data } = useQuery(course_query, {
        variables: { id: props.id }
    });

    let content = <h1>Page not found</h1>

    if (data) {
        console.log("there is data")
        console.log(data)
    }

    useEffect(() => {
        if (data) {
            console.log(data)
            setCourse(data.CourseById)
            let newTopics: Topic[] = []
            data.CourseById.sections.map((section: { lessons: any[]; }) => {
                section.lessons.map((lesson: { topics: any[]; }) => {
                    lesson.topics.map((topic: { title: any; id: any; }) => {
                        let newTopic: Topic = {
                            title: topic.title,
                            id: topic.id
                        }
                        newTopics.push(newTopic)
                    })
                })
            })
            console.log(newTopics)
            setTopics(newTopics)
        }
    }, [])

    let topicDisplay = topics.map((topic, i) => {
        return <p
            className={`font-sans hover:cursor-pointer my-2 text-xs
            transform transition-all hover:scale-110
            ${i == pageIndex ? 'font-bold text-brandPrimary-900' : ' '}`}
            onClick={() => {
                setPageIndex(i)
                setSelectedPage(topic.id)
            }}
            key={i}>
            {topic.title}
        </p>
    })


    return (
        <div className='h-full bg-bgDefault-100 '>
            <NavBar/>
            <div className='flex flex-row h-full'>
                <div className='mr-10 h-full w-1/3'>
                    <h1
                        className='text-2xl text-center mt-5'>
                        {course?.courseGroup?.title}
                    </h1>
                    <div className='mt-2 ml-16'> 
                    { topicDisplay }
                    </div>
                </div>
                <div className='w-full h-full flex flex-col justify-between mt-10'>
                    <GeneralTopic course_id={props.id} topic_id={selectedPage}/>
                    <div className='flex flex-row justify-between mb-14'>
                        <h1
                            className='hover:bg-slate-100 bg-slate-400 rounded-lg 
                            m-2 px-3 hover:cursor-pointer w-60 text-lg text-center'
                            onClick={() => {
                                setSelectedPage(topics[(pageIndex - 1) % topics.length].id)
                                setPageIndex((pageIndex - 1) % topics.length )
                            }}
                            >Last Page</h1>
                        <h1
                            className='hover:bg-slate-100 bg-slate-400 rounded-lg 
                            m-2 px-3 hover:cursor-pointer w-60 text-lg text-center'
                            onClick={() => {
                                setSelectedPage(topics[(pageIndex + 1) % topics.length].id)
                                setPageIndex((pageIndex + 1) % topics.length)
                            }}
                            >Next Page</h1>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export { CourseComponent };