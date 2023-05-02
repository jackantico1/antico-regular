import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { LearningPath, Milestone } from '@thoughtindustries/content/src/graphql/global-types';
import { MilestoneComponent } from '../../components/ContentObjects/MilestoneComponent';

function LearningPathComponent(props: { slug: string }) {

    const [learningPath, setLearningPath] = useState<LearningPath>();
    const [milestones, setMilestones] = useState<Milestone[]>();

    const learning_path_progess_query = gql`
    query CurrentUserLearningPathMilestoneCompletionsBySlug($slug: Slug!) {
        CurrentUserLearningPathMilestoneCompletionsBySlug(slug: $slug) {
          id
        }
    }`

    const learning_path_query = gql`
    query LearningPathBySlug($slug: Slug!) {
        LearningPathBySlug(slug: $slug) {
            name
            asset
            shortDescription
            longDescription
            milestones {
                id
            }
        }
    }`

    const { data, error } = useQuery(learning_path_query, {
        variables: { slug: props.slug }
    });


    useEffect(() => {
        if (data && data.LearningPathBySlug.milestones) {
            console.log(data)
            setLearningPath(data.LearningPathBySlug) 
        }
    })

    let content
    if (learningPath?.milestones) {
        content = learningPath?.milestones.map((milestone) => {
            return <MilestoneComponent id={milestone.id} />
        })
    }

    return (
        <>
            <h1 className='text-center font text-2xl'>{learningPath?.name}</h1>
            <div className='flex flex-row justify-center'>
                <img className='' src={learningPath?.asset}></img>
            </div>
            <div className='flex flex-row justify-center'>
                <h1 className='w-1/2 text-xs'>{learningPath?.longDescription}</h1>
            </div>
            {content}
        </>
    );
}

export { LearningPathComponent };