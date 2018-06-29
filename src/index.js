import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import Clock from './Clock';
import 'font-awesome/css/font-awesome.min.css';
ReactDOM.render(

<div>
<App/>
{/* <Clock/> */}

</div>,

document.getElementById('root'));
registerServiceWorker();
