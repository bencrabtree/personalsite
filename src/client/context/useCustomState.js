import React, { useState, useContext } from 'react';
import { Context } from './context';

const useCustomState = () => {
    const [ state, setState ] = useContext(Context);

    const initSseListener = () => {
        state.sseChannel.addEventListener('addSong', e => {
            console.log('this work?', e.data)
            addSongToFavorites(e.data);
        });
    }

    // add song to favorites
    const addSongtoFavorites = data => {
        let newFavorited = state.favorited;
        newFavorited.push({
            track: data.trackName,
            artist: data.artistName,
            album: data.albumName,
            url: data.trackUrl
        });

        setState({ ...state, favorited: newFavorited });
    }

    const deleteSongFromFavorites = trackName => {
        let newFavorited = state.favorited;
        delete newFavorited[trackName];
        setState({ ...state, favorited: newFavorited });
    }

    return {
        loaded: state.loaded,
        state,
        initSseListener,
        favoritedSongs: state.favorited,
        covidData: state.covidData
    }
}

export default useCustomState;
