import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App.js';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { call, put as dispatch, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// WATCHER: Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_PROJECTS', fetchProject);
  yield takeEvery('ADD_PROJECT', addProject);
  yield takeEvery('FETCH_TAGS', fetchTag);
  yield takeEvery('DETELE', deleteProjects);
}

// SAGA AXIOS ACTIONS
function* fetchProject() {
  const projects = yield call(axios.get, '/api/project');
  yield dispatch({ type: 'SET_PROJECTS', payload: projects.data});
}
// adding new project to db
function* addProject(action) {
  yield call(axios.post, '/api/project', action.payload)
  yield dispatch({type: 'FETCH_PROJECTS'});
}

function* fetchTag() {
  const tags = yield call(axios.get, '/api/tag');
  yield dispatch({ type: 'SET_TAGS', payload: tags.data});
}

function* deleteProjects(action) {
  yield call(axios.delete, `/api/project/${action.payload}`);
  yield dispatch({type: 'FETCH_PROJECTS'});
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store projects returned from the server
const projectList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the project tags (e.g. 'React', 'jQuery', 'Angular', 'Node.js')
const tagList = (state = [], action) => {
  switch (action.type) {
    case 'SET_TAGS':
      return action.payload;
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    projectList,
    tagList,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
  document.getElementById('root'));
serviceWorker.unregister();