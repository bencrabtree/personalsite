import React from 'react';
import Pill from './general/Pill';

const ProjectElt = props => {
    const elt = props.project;

    return (
        <div className='project-elt'>
            <div className='imgFill'></div>
            <div className='project-desc'>
                <a href={ elt.url === 'home' ? '/' : `/projects/project/${elt.url}` }>
                    <h1>{ elt.title }</h1>
                </a>
                <div className='pills'>
                    { elt.tags.map((elt, key) => {
                        return (
                            <Pill data={ elt } key={key} />
                        )
                    }) }
                </div>
                <h4>{ elt.description }</h4>
            </div>
        </div>
    )
}

export default ProjectElt;
