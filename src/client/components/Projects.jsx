import React from 'react';
import { useLocation } from 'react-router-dom';
import JupyterFrame from './Jupyter';
import MainTitle from './general/MainTitle';
import ProjectElt from './ProjectElt';
import { projects } from '../constants/projects';

const Projects = () => {
    const location = useLocation();

    const renderProjectList = () => {
        return projects.map((elt, key) => {
            return (
                <ProjectElt project={ elt } key={key} />
            )
        })
    }

    const filterProjectList = (tag) => {
        let filtered = projects.filter(project => project.tags.find(_tag => _tag === tag));
        if (filtered.length === 0) filtered = projects;

        return filtered.map((elt, key) => {
            return (
                <ProjectElt project={ elt } key={key} />
            )
        })
    }

    const renderProject = () => {
        switch (location.pathname.split('/')[2]) {
            case 'tag':
                return (
                    <>
                        <MainTitle label='My Projects' sub={`Showing ${location.pathname.split('/')[3]} Projects`} link='/projects' />
                        <div className='content-cntr'>
                            <div className='projects'>
                                { filterProjectList(location.pathname.split('/')[3]) }
                            </div>
                        </div>
                    </>
                )

            case 'project':

                switch (location.pathname.split('/')[3]) {
                    case 'creditCardClassifier': {
                        var html = require('../projects/creditcardclassifier.html');
                        var template = { __html: html };
                        return (
                            <JupyterFrame
                                title='Credit Card Fraud Classifier'
                                subtitle='I used undersampling to fine tune a logistic regression classifier in order to minimize a type-II error.'
                                template={ template }
                            />
                        )
                    }
                    case 'home':
                    case 'contentFiller':
                    default:
                        return (
                            <>
                                <MainTitle label='My Projects' link='/projects' />
                                <div className='content-cntr'>
                                    <div className='projects'>
                                        <h1>Not Found for { location.pathname }</h1>
                                    </div>
                                </div>
                            </>
                        )
                }


            default:
                return (
                    <>
                        <MainTitle label='My Projects' />
                        <div className='content-cntr'>
                            <div className='projects'>
                                { renderProjectList() }
                            </div>
                        </div>
                    </>
                )
        }
    }

    return (
        renderProject()
    )
}

export default Projects;
