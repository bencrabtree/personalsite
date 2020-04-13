import React from 'react';
import MainTitle from './general/MainTitle';
import SubTitle from './general/SubTitle';

const JupyterFrame = props => {

    return (
        <>
            <MainTitle label={ props.title } sub={ props.subtitle } />
            <div className='jupyter' dangerouslySetInnerHTML={ props.template }/>
        </>
    )
}

export default JupyterFrame;
