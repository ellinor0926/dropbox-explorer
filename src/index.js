// import React from 'react';
import { render } from 'react-dom';
import './index.css';
import app from './App';
import registerServiceWorker from './registerServiceWorker';

app(component => render(component, document.getElementById('root')));
registerServiceWorker();
