import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ContextProvider } from './context/context'
import { NavBar, Home, Dashboard, Projects, Contact, NotFound } from './components/'
import './assets/default.scss';

const App = () => {
    return (
        <ContextProvider>
            <NavBar />
            <div className='main-content'>
                <Router>
                    <Switch>
                        <Route exact path='/' component={ Home } />
                        <Route path='/dashboard' component={ Dashboard } />
                        <Route path='/projects' component={ Projects } />
                        <Route path='/contact' component={ Contact } />
                        <Route component={ NotFound } />
                    </Switch>
                </Router>
            </div>
            <div className='footer'>
                <p>Fooooooooooooooooooooooooooooooooooter</p>
            </div>
        </ContextProvider>
    );
}

ReactDOM.render(<App/>, document.getElementById('app'));
