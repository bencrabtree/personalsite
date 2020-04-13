import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const Context = createContext([{}, () => {}]);

const ContextProvider = props => {
    const [ state, setState ] = useState({
        darkMode: null,
        sseChannel: null,
        favorited: [],
        covidData: [],
        loaded: false
    });

    useEffect(() => {
        // in case we need AJAX calls
        const loadData = async () => {
            let _favorited = [];
            const { data: favorited } = await axios.get('/spotify/favorited');
            const { data : covid } = await axios.get('/covid/info');

            setState({
                darkMode: false,
                sseChannel: new EventSource('/events/spotify'),
                favorited: favorited,
                covidData: covid,
                loaded: true
            });

            console.log('loaded data')
        }

        loadData();
    }, []);

    return (
        <Context.Provider value={[ state, setState ]}>
            { props.children }
        </Context.Provider>
    );
}

export { Context, ContextProvider };
