import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom"
import Home from './Home/Home'
import StateWise from './StateWise/StateWise'
import DistrictWise from './DistrictWise/DistrictWise'
import About from './About'

export default function AppComponent(props) {
	const titles = [ 'Covid-19 India Tracker', 'State Wise', 'District Wise', 'About', ]
	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<div className="navbar-nav">
						<NavLink exact activeClassName="active" className="nav-item nav-link h5" to="/">{titles[0]}</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link h5" to="/statewise">{titles[1]}</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link h5" to="/districtwise">{titles[2]}</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link h5" to="/about">{titles[3]}</NavLink>
					</div>
				</nav>
				<Switch>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/districtwise">
						<DistrictWise districts={props.districts} />
					</Route>
					<Route path="/statewise">
						<StateWise states={props.states[props.type]} type={props.type} setType={props.setType} />
					</Route>
					<Route path="/">
						<Home
							confirmed={props.confirmed}
							active={props.active}
							deceased={props.deceased}
							recovered={props.recovered}
							tested={props.tested}
							world={props.world}
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}