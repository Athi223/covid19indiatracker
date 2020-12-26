import React, { useEffect } from 'react'
import { states } from '../States'
import './Clustering.css'

export default function Clustering(props) {
	useEffect(() => {
		document.title = "Clustering"
	}, [])
	return(
		<div className="container-fluid">
			<div className="row text-center">
				<div className="col-12 col-md-12 col-lg-6 col-xl-6">
					<h5 style={{ color: '#fd7e14' }}>Confirmed</h5>
					<div className="table-responsive">
						<table className="table-striped w-full border">
							<TableHead />
							<tbody>
								{props.clusters['confirmed'][0].map((v, index) => (<TableRow key={index} index={index} clusters={props.clusters['confirmed']}/>))}
							</tbody>
						</table>
					</div>
				</div>
				<div className="col-12 col-md-12 col-lg-6 col-xl-6">
					<h5 className="text-primary">Active</h5>
					<div className="table-responsive">
						<table className="table-striped w-full border">
							<TableHead />
							<tbody>
								{props.clusters['active'][0].map((v, index) => (<TableRow key={index} index={index} clusters={props.clusters['active']}/>))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<hr />
			<div className="row text-center">
				<div className="col-12 col-md-12 col-lg-6 col-xl-6">
					<h5 className="text-danger">Deceased</h5>
					<div className="table-responsive">
						<table className="table-striped w-full border">
							<TableHead />
							<tbody>
								{props.clusters['deceased'][0].map((v, index) => (<TableRow key={index} index={index} clusters={props.clusters['deceased']}/>))}
							</tbody>
						</table>
					</div>
				</div>
				<div className="col-12 col-md-12 col-lg-6 col-xl-6">
					<h5 className="text-success">Recovered</h5>
					<div className="table-responsive">
						<table className="table-striped w-full border">
							<TableHead />
							<tbody>
								{props.clusters['recovered'][0].map((v, index) => (<TableRow key={index} index={index} clusters={props.clusters['recovered']}/>))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

function TableHead() {
	return(
	<thead>
		<tr>
			<th>Low</th>
			<th>Moderate</th>
			<th>High</th>
		</tr>
	</thead>
	)
}

function TableRow(props) {
	return(
		<tr>
			<td className="border border-bottom-0">{states[props.clusters[0][props.index]]}</td>
			<td className="border border-bottom-0">{states[props.clusters[1][props.index]]}</td>
			<td className="border border-bottom-0">{states[props.clusters[2][props.index]]}</td>
		</tr>
	)
}
