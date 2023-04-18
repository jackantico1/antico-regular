import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Milestone } from '@thoughtindustries/content/src/graphql/global-types';

function MilestoneComponent(props: { id: string }) {

    const [milestone, setMilestone] = useState<Milestone>();

    const milestones_query = gql`
    query Milestone($id: ID!) {
        Milestone(id: $id) {
            name
            contentItems {
                title
                id
                description
                asset
                contentTypeLabel
            }
            completionCriteria {
                type
            }
            completionCriteriaDescription
        }
    }`

    const { data, error } = useQuery(milestones_query, {
        variables: { id: props.id }
    });

    useEffect(() => {
        if (data && data.Milestone) {
            setMilestone(data.Milestone)
        }
    })

    let content
    if (milestone?.contentItems) {
        content = milestone?.contentItems.map((contentItem, i) => {
            return <div className='flex flex-row justify-center my-10' key={i}>
                <div className='flex flex-row justify-center w-1/2 shadow-lg'>
                    <img className='w-72' src={contentItem.asset}></img>
                    <div className='flex flex-col ml-10'>
                        <h1 className='font-bold text-base'>{contentItem.title}</h1>
                        <div>
                            <h1 className='text-sm'>{contentItem.contentTypeLabel}</h1>
                            <h2 className='text-sm'>{contentItem.description}</h2>
                            <h2 className='bg-blue-500 text-white rounded-md text-center w-32 h-12 flex flex-col justify-center align-middle'>
                                Start Here
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        })
    }
    
    return (
        <div className='bg-slate-50 m-10 pb-10' key={props.id}>
            <div className='bg-slate-100 shadow-sm'>
                <h1 className='text-2xl ml-10 font-bold'>{milestone?.name}</h1>
            </div>
            {content}
        </div>
    );
}


export { MilestoneComponent };