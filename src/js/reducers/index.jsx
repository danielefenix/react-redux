/*
 *  In Redux, all reducers get called regardless of the action, so inside each one
 *  return the original state if the action is not applicable.
 *
 *  Actions describe the fact that something happened, but don't specify how the application's state changes in response.
 *  This is the job of reducers.
 * */

import {combineReducers} from 'redux';
import byId, * as fromById from './byId.jsx';
import createList, * as fromList from './createList.jsx'

const listByFilter = combineReducers({
    all: createList('all'),
    active: createList('active'),
    completed: createList('completed'),
});

const todos = combineReducers({
    byId,
    listByFilter
});

export default todos;

//selector
export const getVisibleTodos = (state, filter) => {
    const ids = fromList.getIds(state.listByFilter[filter]);
    return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
    fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
    fromList.getErrorMessage(state.listByFilter[filter]);