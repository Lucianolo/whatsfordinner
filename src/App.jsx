import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Profile from './components/Profile'
import TableView from './components/TableView'
import requireAuthentication from './utils/requireAuth'
import TableEditor from './components/TableEditor'
import SignInWith from './components/SignInWith'
import 'bootstrap/dist/css/bootstrap.min.css'
class App extends Component {
    render() {
        const pathname = window.location.pathname
        return (
            <div className='App'>
                { !pathname.includes('editor') ? <Header /> : '' }
                <SignInWith />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/profile/:id" component={Profile} />
                    <Route path="/tables/:id" component={TableView} />
                    <Route path="/tables/editor" component={requireAuthentication(TableEditor)} />
                    <Route path="**" component={Home} />
                </Switch>
            </div>
        )
    }
}

export default App
