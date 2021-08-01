import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Vaccinations.css'
import PieGraph from './PieGraph'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, LabelList } from 'recharts'

export default function Vaccinations(props) {
	useEffect(() => {
		document.title = "Vaccinations"
	}, [])
	const vaccinations_vs_registrations = [
		{
			'name': "Vaccinations V/S Registrations",
			'Vaccinations': parseInt(props.vaccinations.total),
			'Registrations': parseInt(props.vaccinations.registrations.total),
		}
	]
	return (
		<div className="container-fluid px-4">
			<div className="row text-center">
				<div className="col-12 col-lg-6 mt-3">
					<h4 className="text-danger">First Dose : {new Intl.NumberFormat('en-IN').format(props.vaccinations.first_doses.total)}</h4>
					<div className="vaccine-graph">
						<PieGraph vaccinations={props.vaccinations.first_doses.stats} />
					</div>
				</div>
				<div className="col-12 col-lg-6 mt-3">
					<h4 style={{ color: "#6610f2" }}>Second Dose : {new Intl.NumberFormat('en-IN').format(props.vaccinations.second_doses.total)}</h4>
					<div className="vaccine-graph">
						<PieGraph vaccinations={props.vaccinations.second_doses.stats} />
					</div>
				</div>
			</div>
			<hr />
			<div className="row text-center mt-3">
				<div className="col-12 col-lg-6 mt-3">
					<h4 className="text-success">Vaccinations V/S Registrations</h4>
					<div className="vaccine-graph">
						<ResponsiveContainer>
						<BarChart data={vaccinations_vs_registrations} layout="vertical" margin={{ left: 55 }}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis type="number" />
							<YAxis type="category" dataKey="name" />
							<Tooltip formatter={value => new Intl.NumberFormat('en-IN').format(value)} />
							<Bar dataKey="Vaccinations" fill="#fd7e14">
								<LabelList formatter={() => "Vaccinations"} position="center" />
							</Bar>
							<Bar dataKey="Registrations" fill="#007bff" label={() => "Registrations" }>
								<LabelList formatter={() => "Registrations"} position="center" />
							</Bar>
						</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
				<div className="col-12 col-lg-6 mt-3">
					<h4 className="text-primary">Registrations : {new Intl.NumberFormat('en-IN').format(props.vaccinations.registrations.total)}</h4>
					<div className="vaccine-graph">
						<PieGraph vaccinations={props.vaccinations.registrations.stats} />
					</div>
				</div>
			</div>
		</div>
	)
}