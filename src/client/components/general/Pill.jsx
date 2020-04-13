import React from 'react';

const Pill = props => {
    const pill = props.data;

    return (
        <a className='pill' href={`/projects/tag/${ pill.label ? pill.label : pill }`} >
            <div className='pill-label'>{ pill.label ? pill.label : pill }</div>
        </a>
    )
}

export default Pill;
