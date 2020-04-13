import React from 'react';
import MainTitle from './general/MainTitle';
import useCustomState from '../context/useCustomState';

const Dashboard = () => {
    const { favoritedSongs } = useCustomState();

    const renderFavoritedList = () => {
        return favoritedSongs.map((elt, key) => {
            return (
                <tr className='favorited-elt' key={key}>
                    <td>{ elt.track }</td>
                    <td>{ elt.artist }</td>
                    <td>{ elt.album }</td>
                    <td><a href={ elt.url }>Open In Spotify</a></td>
                </tr>
            );
        });
    }

    return (
        <>
            <MainTitle label='Dashboard' />
            <div className='content-cntr' id='dashboard'>
                <div className='favorited-cntr'>
                    <h1 className='favorited'>Favorited Songs</h1>
                    <table>
                        <thead>
                            <tr className='favorited-head'>
                                <td>Track</td>
                                <td>Artist</td>
                                <td>Album</td>
                                <td>Link</td>
                            </tr>
                        </thead>
                        <tbody>
                            { renderFavoritedList() }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
