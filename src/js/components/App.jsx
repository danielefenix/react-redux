import React from 'react'
import Footer from './Footer.jsx'
import AddTodo from '../containers/AddTodo.jsx'
import VisibleTodoList from '../containers/VisibleTodoList.jsx'

const App = ({params}) => (
    <div>
        <AddTodo />
        <VisibleTodoList /> {/* <VisibleTodoList filter={params.filter || 'all'} /> */}
        <Footer />
    </div>
);

export default App