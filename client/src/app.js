import React from 'react';
import ReactDOM from 'react-dom';
import NoteList from './components/NoteList';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <h1>Hello World </h1>
        <NoteList />
    </Provider>
    , document.getElementById("app"));