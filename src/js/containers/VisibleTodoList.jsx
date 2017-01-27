import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import * as actions from '../actions/index.jsx'
import TodoList from '../components/TodoList.jsx'
import {getVisibleTodos, getErrorMessage, getIsFetching} from '../reducers/index.jsx';
import FetchError from '../components/FetchError.jsx'

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
        const {toggleTodo, todos, isFetching, errorMessage} = this.props;
        if (isFetching && todos.length) {
            return <p>Loading...</p>
        }

        if (errorMessage && !todos.length) {
            return <FetchError
                message={errorMessage}
                onRetry={() => this.fetchData() }
            />
        }

        return <TodoList todos={todos} onTodoClick={toggleTodo}/>;
    }
}

//use .params because of wrapped by withRouter
const mapStateToProps = (state, {params}) => {
    const filter = params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        errorMessage: getErrorMessage(state, filter),
        filter,
    }
};

/*
 instead of a manual configuration pass the whole action object to connect()
 const mapDispatchToProps = (dispatch) => ({
 onTodoClick(id) {
 dispatch(toggleTodo(id))
 }
 });*/

VisibleTodoList = withRouter(connect( //what allows us to connect a component to Redux's store, and action creators
    mapStateToProps,
    /* mapDispatchToProps */ /*{onTodoClick: toggleTodo, receiveTodos}*/
    actions
)(VisibleTodoList));

export default VisibleTodoList;