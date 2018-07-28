import React from 'react';
import ReactDOM from 'react-dom';
import MovieApp from './components/App.jsx';

import "./scss/styles.scss";

ReactDOM.hydrate(
  <MovieApp { ...MovieRoulette.initialState } />,
  document.getElementById('root')
);