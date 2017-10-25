import React from 'react';
import { render } from 'react-dom';
import { 
    createStore,
    applyMiddleware,
    combineReducers 
} from 'redux'
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { Route, IndexRoute } from 'react-router';
import { 
    ConnectedRouter,
    routerReducer,
    routerMiddleware
} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { devToolsEnhancer } from 'redux-devtools-extension';

import mainReducer from './modules/main/redux/reducer';
import mainSaga from './modules/main/redux/sagas';

import App from './modules/main/containers/main';

const history = createHistory();
const routingMiddleware = routerMiddleware(history)

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    main: mainReducer,
    routing: routerReducer
  }),
  devToolsEnhancer(),
  applyMiddleware(sagaMiddleware, routingMiddleware)
);

sagaMiddleware.run(mainSaga);

render(<Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App} />
      </div>
    </ConnectedRouter>
</Provider>, document.getElementById('app'));
