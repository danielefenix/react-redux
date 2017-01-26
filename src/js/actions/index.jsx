import {normalize} from 'normalizr';
import * as schema from './schema.jsx';
import * as api from '../api/index.jsx';
import {getIsFetching} from '../reducers/index.jsx'

export const addTodo = (text) => (dispatch) =>
    api.addTodo(text).then(response => {
        dispatch({
            type: 'ADD_TODO_SUCCESS',
            response: normalize(response, schema.todo)
        });
    });

//thunk middleware
export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        return;
    }

    dispatch({
        type: 'REQUEST_TODOS',
        filter
    });

    return api.fetchTodos(filter).then(
        response => {
            dispatch({
                type: 'FETCH_TODOS_SUCCESS',
                response: normalize(response, schema.arrayOfTodos),
                filter
            });
        },
        error => {
            dispatch({
                type: 'FETCH_TODOS_FAILURE',
                filter,
                message: error.message || 'Something went wrong.'
            })
        });
};

export const toggleTodo = (id) => (dispatch) =>
    api.toggleTodo(id).then(response => {
        dispatch({
            type: 'TOGGLE_TODO_SUCCESS',
            response: normalize(response, schema.todo)
        })
    });