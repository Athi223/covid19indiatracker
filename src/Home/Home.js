import React from 'react'
import './Home.css'
import { ResponsiveContainer, Tooltip, PolarGrid, PolarAngleAxis, RadarChart, PolarRadiusAxis, Radar, Legend } from 'recharts';
import Graph from './Graph';

export default function Home(props) {
	React.useEffect(() => {
		document.title = "Covid-19 India Tracker"
	}, [])
	return(
		<div className="container-fluid">
			<div className="row text-center">
				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-2">
					<div className="mx-2 my-4 bg-info cases-types h2 p-4 d-flex align-items-center justify-content-center">
						<span>Covid-19 India Tracker</span>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-2">
					<div className="mx-2 my-4 cases-types h3 p-4 d-flex flex-column justify-content-around" style ={{ backgroundColor: '#fd7e14' }}>
						<span>Confirmed</span>
						<span>{new Intl.NumberFormat('en-IN').format(props.confirmed[props.confirmed.length-1].confirmed)}</span>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-2">
					<div className="mx-2 my-4 bg-primary cases-types h3 p-4 d-flex flex-column justify-content-around">
						<span>Active</span>
						<span>{new Intl.NumberFormat('en-IN').format(props.active[props.active.length-1].active)}</span>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-2">
					<div className="mx-2 my-4 bg-danger cases-types h3 p-4 d-flex flex-column justify-content-around">
						<span>Deceased</span>
						<span>{new Intl.NumberFormat('en-IN').format(props.deceased[props.deceased.length-1].deceased)}</span>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-2">
					<div className="mx-2 my-4 bg-success cases-types h3 p-4 d-flex flex-column justify-content-around">
						<span>Recovered</span>
						<span>{new Intl.NumberFormat('en-IN').format(props.recovered[props.recovered.length-1].recovered)}</span>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-2">
					<div className="mx-2 my-4 cases-types h3 p-4 d-flex flex-column justify-content-around" style ={{ backgroundColor: '#6610f2' }}>
						<span>Tested</span>
						<span>{props.tested}</span>
					</div>
				</div>
			</div>
			<div className="row text-center">
				<div className="col-12 col-md-12 col-lg-12 col-xl-9">
					<div className="row text-center">
						<div className="col-12 col-md-12 col-lg-6 col-xl-6">
							<h5 style={{ color: '#fd7e14' }}>Confirmed</h5>
							<div className="home-graph">
								<Graph data={props.confirmed} dataKey="confirmed" stroke="#fd7e14" />
							</div>
						</div>
						<div className="col-12 col-md-12 col-lg-6 col-xl-6">
							<h5 className="text-primary">Active</h5>
							<div className="home-graph">
								<Graph data={props.active} dataKey="active" stroke="#007bff" />
							</div>
						</div>
					</div>
					<hr />
					<div className="row text-center">
						<div className="col-12 col-md-12 col-lg-6 col-xl-6">
							<h5 className="text-danger">Deceased</h5>
							<div className="home-graph">
								<Graph data={props.deceased} dataKey="deceased" stroke="#dc3545" />
							</div>
						</div>
						<div className="col-12 col-md-12 col-lg-6 col-xl-6">
							<h5 className="text-success">Recovered</h5>
							<div className="home-graph">
								<Graph data={props.recovered} dataKey="recovered" stroke="#28a745" />
							</div>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-12 col-lg-12 col-xl-3">
					<div style={{ height: "54vh" }}>
						<ResponsiveContainer>
							<RadarChart data={props.world} margin={{ left: 40, right: 40 }} startAngle={35} endAngle={-325}>
								<PolarGrid />
								<PolarAngleAxis tick={{ fill: '#666'}} dataKey="type"/>
								<PolarRadiusAxis scale="sqrt" />
								<Radar dataKey="World" stroke="purple" fill="#8884d8" fillOpacity={0.6} />
								<Radar dataKey="India" stroke="orange" fill="gold" fillOpacity={0.6} />
								<Tooltip />
								<Legend />
							</RadarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</div>
	)
}