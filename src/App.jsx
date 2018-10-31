import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

import { store } from './redux/store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './redux/actions/authentication'

import Header from './components/Header'
import Home from './components/Home'
import Profile from './components/Profile'
import TableView from './components/TableView'
import requireAuthentication from './utils/requireAuth'
import TableEditor from './components/TableEditor'
import SignInWith from './components/SignInWith'
import Register from './components/Register'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css'

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)
    const decoded = jwt_decode(localStorage.jwtToken)
    store.dispatch(setCurrentUser(decoded))

    const currentTime = Date.now() / 1000
    if(decoded.exp < currentTime) {
        store.dispatch(logoutUser())
        window.location.href = '/login'
    }
}

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
                    <div className="container">
                        <Route exact path="/register" component={ Register } />
                        <Route exact path="/login" component={ Login } />
                    </div>
                    <Route path="**" component={Home} />
                </Switch>
            </div>
        )
    }
}

export default App
