import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom"
import Home from './Home/Home'
import StateWise from './StateWise/StateWise'
import DistrictWise from './DistrictWise/DistrictWise'
import Prediction from './Prediction/Prediction'
import Clustering from './Clustering/Clustering'
import About from './About'
import 'halfmoon/css/halfmoon.min.css'
import halfmoon from 'halfmoon'

export default function AppComponent(props) {
	const titles = [ 'Covid-19 India Tracker', 'State Wise', 'District Wise', 'Prediction', 'Clustering', 'About' ]
	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand-lg navbar-dark font-size-24" style={{ backgroundColor: '#250940' }}>
					<div className="navbar-toggler" onClick={() => document.querySelector('.collapse').classList.toggle('show')}>
						<span className="navbar-toggler-icon"></span>
					</div>
					<div className="collapse navbar-collapse">
						<div className="navbar-nav">
							<NavLink exact activeClassName="active" className="nav-item nav-link h5" to="/">{titles[0]}</NavLink>
							<NavLink activeClassName="active" className="nav-item nav-link h5" to="/statewise">{titles[1]}</NavLink>
							<NavLink activeClassName="active" className="nav-item nav-link h5" to="/districtwise">{titles[2]}</NavLink>
							<NavLink activeClassName="active" className="nav-item nav-link h5" to="/prediction">{titles[3]}</NavLink>
							<NavLink activeClassName="active" className="nav-item nav-link h5" to="/clustering">{titles[4]}</NavLink>
							<NavLink activeClassName="active" className="nav-item nav-link h5" to="/about">{titles[5]}</NavLink>
						</div>
					</div>
					<div className="ml-auto mr-4" style={{ cursor: "pointer" }} onClick={() => halfmoon.toggleDarkMode()}><span role="img" aria-label="darkmode">🌓</span></div>
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
					<Route path="/prediction">
						<Prediction
							annual_dates={props.annual_dates}
							annual_prediction={props.annual_prediction}
							date={props.date}
							setDate={props.setDate}
						/>
					</Route>
					<Route path="/clustering">
						<Clustering clusters={props.clusters} />
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
