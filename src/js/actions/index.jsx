import {v4} from 'node-uuid';
import {getIsFetching} from '../reducers/index.jsx'
import * as api from '../api/index.jsx';

export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
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
                response,
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
export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});