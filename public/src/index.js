import React           from 'react';
import { render }      from 'react-dom'
import { Provider }    from 'react-redux';
import { createStore } from 'redux';

import reducers        from './reducers';
import INITSTATE       from './config/INITSTATE';
import App             from './App';

let store = createStore(reducers, INITSTATE);

window.getState = store.getState;
render(
	<Provider store={store}><App /></Provider>,
	document.querySelector('#container')
);