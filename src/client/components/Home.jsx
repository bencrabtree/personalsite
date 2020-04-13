import React from 'react';
import MainTitle from './general/MainTitle';
import Pill from './general/Pill';
import CovidCharts from './CovidCharts';
import { tagList } from '../constants/tags';
import useCustomState from '../context/useCustomState'

const Home = () => {
    const { covidData } = useCustomState();

    return (
        <>
            <MainTitle label='Home' />
            <div className='content-cntr'>
                <div className='bio-container'>
                    <div className='bio header'>
                        <div className='pic' />
                        <div className='info'>
                            <h1>Hi, I'm Ben.</h1>
                            <p>I should do something productive this quarantine. Maybe creating this website
                            will force me to start working on side projects in my free time. Maybe I won't ever deploy
                            this and I will have wasted a week developing something nobody will see. Maybe that doesn't matter.
                            <br/><br/>
                            Description about me and the stuff that I do. Description about me and the stuff that I do.
                            Description about me and the stuff that I do. Description about me and the stuff that I do.
                            Description about me and the stuff that I do. Description about me and the stuff that I do.
                            Description about me and the stuff that I do. Description about me and the stuff that I do.</p>
                        </div>
                    </div>

                    <div className='bio skills'>
                        <h1>What I am skilled at</h1>
                        <div className='pills'>
                            { tagList.map((tag, key) => {
                                return (
                                    <Pill data={ tag } key={key} />
                                )
                            })}
                        </div>
                    </div>

                    <div className='bio covid'>
                        <h1>Live Covid Tracking <small>(thru yesterday)</small></h1>
                        <div className='covid-details'>
                            <CovidCharts />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
