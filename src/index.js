import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import store from './Store/createStore';
import config from './config';
import { Switch, Route } from 'react-router-dom';
import Loader from "./App/Components/Loader"

const app = (
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
