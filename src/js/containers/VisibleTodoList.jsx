import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
//import {toggleTodo, receiveTodos} from '../actions/index.jsx'
import * as actions from '../actions/index.jsx'
import TodoList from '../components/TodoList.jsx'
import {getVisibleTodos} from '../reducers/index.jsx'

class VisibleTodoList extends Component {

    fetchData() {
        const {filter, fetchTodos} = this.props;
        fetchTodos(filter);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }

    render() {
        const {toggleTodo, ...rest} = this.props;
        return <TodoList {...rest} onTodoClick={toggleTodo}/>;
    }
}

//use .params because of wrapped by withRouter
const mapStateToProps = (state, {params}) => {
    const filter = params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        filter
    }
};

/*
 instead of a manual configuration pass the whole action object to connect()
 const mapDispatchToProps = (dispatch) => ({
 onTodoClick(id) {
 dispatch(toggleTodo(id))
 }
 });*/

VisibleTodoList = withRouter(connect(
    mapStateToProps,
    /* mapDispatchToProps */ /*{onTodoClick: toggleTodo, receiveTodos}*/
    actions
)(VisibleTodoList));

export default VisibleTodoList;