import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

//import { Threads } from '../../components/Comments/Threads'
import { Forums } from '../../components/Comments/Forums'

function Page() {

    return (
        <div>
            <Forums id="61e65354-07b7-4368-9fd1-7081c1345d89"/>
        </div>
    );
}

export { Page };