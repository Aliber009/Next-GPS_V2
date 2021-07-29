import React from 'react'
import MainToolbar from '../../MainToolbar';
import SeqTree from './SeqTree';

function SeqGroupsPage() {
    const data = [
        {id:"eJnlf2Dck9", name: "groupe default", child: []}
    ]
    return (
        <div>
            <MainToolbar />
            <SeqTree data={data}/>
        </div>
    )
}

export default SeqGroupsPage
