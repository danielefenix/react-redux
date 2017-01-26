import React from 'react';
import {Provider} from 'react-redux';
import App from './App.jsx';
import {Router, Route, browserHistory} from 'react-router';

const Root = ({store}) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/(:filter)' component={App}/>
        </Router>
    </Provider>
);

export default Root;