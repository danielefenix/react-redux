import {createStore, applyMiddleware} from 'redux'
import todoApp from './reducers/index.jsx'
import promise from 'redux-promise';
import createLogger  from 'redux-logger';

const configureStore = () => {

    const middlewares = [promise];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    //wrapDispatchWithMiddlewares(store, middlewares);

    return  createStore(
        todoApp,
        /*persistent state*/
        applyMiddleware(...middlewares)); //enhancers

};

export default configureStore;

/*
 manual implementation of the 'logger' middleware

 const logger = (store) => (next) => {

 if (!console.group) {
 return next;
 }

 return (action) => {
 console.group(action.type);
 console.log('%c prev stat', 'color: gray', store.getState());
 console.log('%c action', 'color: blue', action);
 const returnValue = next(action);
 console.log('%c next stat', 'color: green', store.getState());
 console.groupEnd(action.type);
 return returnValue;
 }
 };*/

/*
 const wrapDispatchWithMiddlewares = (store, middlewares)=> {
 middlewares.slice().reverse().forEach(middleware =>
 store.dispatch = middleware(store)(store.dispatch));

 //clone and reverse the middleware declaration to specify them in the order in which the action travels through them
 };
 */

/*
 manual implementation of the 'promise' middleware
 const promise = (store) => (next) => (action) => {
 if (typeof action.then === 'function') {
 return action.then(next);
 } else {
 return next;
 }
 };
 */