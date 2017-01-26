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