import React from 'react';

const MainTitle = props => {
    return (
        <div className='main-title'>
            <a href={ props.link ? props.link : null } >
                <h1>{ props.label }</h1>
                { props.sub ? <h3>{ props.sub }</h3> : null}
            </a>
        </div>
    )
}

export default MainTitle;
