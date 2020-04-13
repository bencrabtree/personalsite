import React, { useEffect, useState, useRef } from 'react';
// import logo from '../../assets/img/'

const NavBar = props => {
    const navRef = useRef(null);
    const [ sticky, setSticky ] = useState(false);

    useEffect(() => {
        const sticky = document.getElementById('navBar').offsetTop;
        window.addEventListener('scroll', () => handleScroll(sticky));

        return () => window.removeEventListener('scroll', () => handleScroll)
    }, [ ]);

    const handleScroll = (sticky) => {
        setSticky(window.pageYOffset > sticky)
    }

    return (
        <div className='header'>
            <div className='cover'></div>
            <nav className={ sticky ? 'sticky' : ''} id="navBar" ref={ navRef }>
                <a href='/' >
                    <div className='nav-label' id={window.location.pathname === '/' ? 'active' : ''}>
                        BenCrabtree.io
                    </div>
                </a>
                <a href='/dashboard'>
                    <div className='nav-label' id={window.location.pathname.startsWith('/dashboard') ? 'active' : ''}>
                        What I'm Listening To
                    </div>
                </a>
                <a href='/projects'>
                    <div className='nav-label' id={window.location.pathname.startsWith('/projects') ? 'active' : ''}>
                        What I've Been Working On
                    </div>
                </a>
                <a href='/contact'>
                    <div className='nav-label' id={window.location.pathname.startsWith('/contact') ? 'active' : ''}>
                        Contact Me
                    </div>
                </a>
                <a href='/more'>
                    <div className='nav-label' id={window.location.pathname === '/more' ? 'active' : ''}>
                        More...
                    </div>
                </a>
            </nav>
        </div>
    )
}

export default NavBar;
