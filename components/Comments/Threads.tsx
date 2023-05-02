import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Comments } from './Comments';

function Threads(props: { forumId: string, courseId: string }) {

    const threads_query = gql`
    query Threads(
        $forumId: ID!,
        $courseId: ID!
    ) {
        Threads(
            forumId: $forumId,
            courseId: $courseId
        ) {
            threads {
                id
                title
                body
            }
        }
    }`

    const { data, error } = useQuery(threads_query, {
        variables: { forumId: props.forumId, courseId: props.courseId }
    });

    let content
    if (data) {
        content = data.Threads.threads.map((thread, i) => {
            return <div className='bg-slate-200 m-10 p-5 rounded-lg' key={i}>
                <h1 className='text-lg'>{thread.title}</h1>
                <h2 className='text-base'>{thread.body}</h2>
                <h1
                    className='bg-blue-400 mt-10 text-base w-28 text-center rounded-lg ml-56 hover:bg-blue-200 cursor-pointer'
                    >Open</h1>
                <Comments commentableId={thread.id} commentableType='thread'/>
            </div>
        })
    }

  return (
    <>
        {content}
    </>
  );
}

export { Threads };