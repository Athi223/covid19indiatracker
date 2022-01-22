import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Vaccinations.css'
import PieGraph from './PieGraph'
// import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, LabelList } from 'recharts'

export default function Vaccinations(props) {
	useEffect(() => {
		document.title = "Vaccinations"
	}, [])
	return (
		<div className="container-fluid px-4">
			<div className="row text-center">
				<div className="col-12 col-lg-6 mt-3">
					<h4 style={{ color: "#fd7e14" }}>Gender-wise</h4>
					<div className="vaccine-graph">
						<PieGraph vaccinations={props.vaccinations.genderwise} />
					</div>
				</div>
				<div className="col-12 col-lg-6 mt-3">
					<h4 style={{ color: "#fd7e14" }}>Dose-wise</h4>
					<div className="vaccine-graph">
						<PieGraph vaccinations={props.vaccinations.dosewise} />
					</div>
				</div>
			</div>
			<hr />
			<div className="row text-center mt-3">
				<div className="col-12 col-lg-6 mt-3">
					<h4 style={{ color: "#fd7e14" }}>Vaccine-wise</h4>
					<div className="vaccine-graph">
						<PieGraph vaccinations={props.vaccinations.vaccinewise} />
					</div>
				</div>
				<div className="col-12 col-lg-6 mt-3">
					<h4 style={{ color: "#fd7e14" }}>Age-wise</h4>
					<div className="vaccine-graph">
						<PieGraph vaccinations={props.vaccinations.agewise} />
					</div>
				</div>	
			</div>
		</div>
	)
}