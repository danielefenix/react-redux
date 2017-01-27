import React from 'react'
import {render} from 'react-dom'
import configureStore from './configureStore.jsx'
import Root from './components/Root.jsx'

const store = configureStore(); // You can also pass in an initialState here

render(
    <Root store={store}/>,
    document.getElementById('todo')
);