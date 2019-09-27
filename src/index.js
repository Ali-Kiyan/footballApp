import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/app.css'
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom' 
import { firebase } from './firebase';

const App = () => {
    return (
        <BrowserRouter >
            <Routes />
        </BrowserRouter>
    )
}
firebase.auth().onAuthStateChanged((user)=>{
    ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})



