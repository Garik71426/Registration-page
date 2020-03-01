import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from './components/AuthPage/Auth';
import IndexRouter from './components/Common/IndexRouter';
import Header from './components/Common/Header';
import My from './components/MyPages/My';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
	render() {
		return (
			<div className='app'>
				<Router>
					<Header/>
					<Switch>
						<Route exact path='/' component={IndexRouter} />
						<Route path='/my' component={My} />
						<Route path='/auth' component={Auth} />
					</Switch>
				</Router>
			</div>
		);
	};
};

export default App;
