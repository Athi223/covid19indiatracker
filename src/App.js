import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import StateWise from './StateWise/StateWise'
import Home from './Home/Home'

export default function App() {
	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<div className="navbar-nav">
						<NavLink exact activeClassName="active" className="nav-item nav-link h5" to="/">Covid-19 India Tracker</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link h5" to="/statewise">State Wise</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link h5" to="/about">About</NavLink>
					</div>
				</nav>
				<Switch>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/statewise">
						<StateWise />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
  }

function About() {
	return <h2>About</h2>;
}
