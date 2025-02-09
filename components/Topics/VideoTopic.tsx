import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import ReactPlayer from 'react-player'

interface Variant {
    label: String;
    title: String;
    subtitle: String;
    body: String;
    copyright: String;
}

function VideoTopic(props: { id: string }) {

    const [wistiaId, setWistiaId] = useState("")
    const [variants, setVariants] = useState<Variant[]>([])
    const [index, setIndex] = useState(0)

    const course_query = gql`
    query Pages($identifiers: [String!]!) {
        Pages(identifiers: $identifiers) {
            ...on ArticlePage {
                videoAsset
                languages {
                    language
                    label
                    title
                    subtitle
                    body
                    copyright
                }
            }
        }
    }`

    const { data, error } = useQuery(course_query, {
        variables: { identifiers: [props.id] }
    });

    useEffect(() => {
        if (data) {
            console.log(data)
            setWistiaId(data.Pages[0].videoAsset)
            let newVariants: Variant[] = []
            for (let i = 0; i < data.Pages[0].languages.length; i++) {
                let newVariant: Variant = {
                    label: data.Pages[0].languages[i].label,
                    title: data.Pages[0].languages[i].title,
                    subtitle: data.Pages[0].languages[i].subtitle,
                    body: data.Pages[0].languages[i].body,
                    copyright: data.Pages[0].languages[i].copyright
                }
                newVariants.push(newVariant)
            }
            setVariants(newVariants)
        }
    }, [])

    let selection = variants.map((variant, i) => {
        return <h1
            onClick={() => {
                setIndex(i)
            }}
            className={`hover:cursor-pointer my-2 text-xl rounded-lg hover:bg-slate-100 w-48
            pl-5
            ${i == index ? 'font-bold' : ''}`}
            key={i}>
            {variant.label}
        </h1>
    })

    let article
    if (variants.length > 0) {
        article = <div className='mt-10'>
            <h1 className='text-2xl'> {variants[index].title} </h1>
            <h1> {variants[index].body.replace(/<[^>]+>/g, '')} </h1>
            <h1 className='mt-5'>ⓒ {variants[index].copyright.replace(/<[^>]+>/g, '')}</h1>

        </div>
    }

    return (
        <div className='flex flex-row my-10'>
            <div className='w-1/4 pl-10'>
                { selection }
            </div>
            <div className='w-3/4 mr-24'>
                <ReactPlayer url={`https://getleda.wistia.com/medias/${wistiaId}`}/>
                { article }
            </div>
        </div>
    );
}


export { VideoTopic };