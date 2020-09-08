import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import StateWise from './StateWise/StateWise'
import Home from './Home/Home'

export default function AppComponent(props) {
    const titles = [ 'Covid-19 India Tracker', 'State Wise', 'About', ]
    const setTitle = (i) => props.setTitle(titles[i])
    return (
		<Router>
			<div>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<div className="navbar-nav">
						<NavLink exact activeClassName="active" className="nav-item nav-link h5" to="/" onClick={() => setTitle(0)}>{titles[0]}</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link h5" to="/statewise" onClick={() => setTitle(1)}>{titles[1]}</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link h5" to="/about" onClick={() => setTitle(2)}>{titles[2]}</NavLink>
					</div>
				</nav>
				<Switch>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/statewise">
						<StateWise states={props.states} type={props.type} setType={props.setType} />
					</Route>
					<Route path="/">
						<Home
                            confirmed={props.confirmed}
                            active={props.active}
                            deceased={props.deceased}
                            recovered={props.recovered}
                            tested={props.tested}
                        />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

function About() {
    return <h1>About</h1>
}