import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

type Comment = {
    body: string;
    childComments: [Comment]
}

function Comments(props: { commentableId: string, commentableType: string }) {

    const comments_query = gql`
    query Comments(
        $commentableId: ID!,
        $commentableType: CommentableType!,
    ) {
        Comments(
            commentableId: $commentableId,
            commentableType: $commentableType,
        ) {
            comments {
                asset
                assetFileName
                body
                childComments {
                    comments {
                        body
                        childComments {
                            comments {
                                body
                            }
                        }
                    }
                }
            }
        }
    }`

    const { data, error } = useQuery(comments_query, {
        variables: { commentableId: props.commentableId, commentableType: props.commentableType }
    });

    let content
    if (data) { 
        console.log("there is data")
        console.log(data)
        content = data.Comments.comments.map((comment, i) => {
            return createComment(comment, i, 1)
        })  
    }

    if (error) {
        console.log(error)
    }

    return (
        <>
            {content}
        </>
    );
}

function createComment(comment: any, i: number, level: number) {
    console.log("inside createComment function")
    console.log(comment)

    let childComments
    if (comment.childComments) {
        console.log("inside If")
        childComments = comment.childComments.comments.map((childComment, i) => {
            return createComment(childComment, i, level + 1)
        })
    }

    return (
        <div key={i}>
            <h1 className={`text-lg ml-${level * 8}`}>{comment.body}</h1>
            { childComments }
        </div>
    )
}

export { Comments };

