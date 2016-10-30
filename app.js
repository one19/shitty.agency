import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import styles from './reset.css'; // eslint-disable-line
import appStyles from './app.css'; // eslint-disable-line

render(<App />, document.getElementById('app'));
