import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Threads } from './Threads'

function Forums(props: { id: string }) {

    const forums_query = gql`
    query Forums($courseId: ID!) {
        Forums(courseId: $courseId) {
            id
            label
        }
    }`

    const { data, error } = useQuery(forums_query, {
        variables: { courseId: props.id }
    });

    let content
    if (data) {
        content = data.Forums.map((forum, i) => {
            return <div key={i}>
                <h1>{forum.label}</h1>
                <Threads forumId={forum.id} courseId={props.id}/>
            </div>
        })
    }

    if (error) {
        console.log(error)
    }

    return (
        <div>
            {content}
        </div>
    );
}


export { Forums };