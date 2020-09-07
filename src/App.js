import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVirus } from '@fortawesome/free-solid-svg-icons'
import StateWise from './StateWise/StateWise'

export default function App() {
	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<div className="navbar-nav">
						<NavLink exact activeClassName="active" className="nav-item nav-link h5" to="/">
							<FontAwesomeIcon icon={faVirus} /> Covid-19 Tracker
						</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link h5" to="/about">About</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link h5" to="/users">Users</NavLink>
					</div>
				</nav>
				<Switch>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/users">
						<Users />
					</Route>
					<Route path="/">
						<StateWise />
					</Route>
				</Switch>
			</div>
		</Router>
	);
  }

function About() {
	return <h2>About</h2>;
}

function Users() {
	return <h2>Users</h2>;
}
