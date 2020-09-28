import React, { useState, useEffect } from 'react'
import Selection from './Selection'
import Graph from './Graph'
import './DistrictWise.css'

export default function DistrictWise(props) {
	const [ state, setState ] = useState()
	const [ data, setData ] = useState([])
	const [ districts, setDistricts ] = useState([])
	const [ district, setDistrict] = useState('')
	const [ graphs, setGraphs ] = useState()
	useEffect(() => {
		document.title = "District Wise"
	}, [])
	useEffect(() => {
		if(state) {
			const districtData = props.districts[state]
			let graphs = [[], []]
			setDistricts(districtData)
			for(const district in districtData) {
				const confirmed = districtData[district].total.confirmed || 0
				const deceased = districtData[district].total.deceased || 0
				const recovered = districtData[district].total.recovered || 0
				graphs[0].push({ district: district, confirmed: confirmed, active: (confirmed - deceased - recovered) })
				graphs[1].push({ district: district, deceased: deceased, recovered: recovered})
			}
			setGraphs(graphs)
		}
		setDistrict('')
	}, [props.districts, state])
	useEffect(() => {
		if(district) {
			let data = []
			const confirmed = districts[district].total.confirmed || 0
			const deceased = districts[district].total.deceased || 0
			const recovered = districts[district].total.recovered || 0
			const tested = districts[district].total.tested || 0
			data.push({ type: 'Confirmed', value: confirmed })
			data.push({ type: 'Active', value: (confirmed - deceased - recovered) })
			data.push({ type: 'Deceased', value: deceased })
			data.push({ type: 'Recovered', value: recovered })
			data.push({ type: 'Tested', value: tested })
			setData(data)
		}
	}, [district, districts])
	return(
		<div className="container-fluid">
			<div className="row text-center">
				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-2">
					<div className="mx-2 my-4 cases-types p-4 d-flex flex-column justify-content-around bg-info">
						<div className="input-group input-group-lg">
							<Selection default="State" options={Object.keys(props.districts)} handleChange={setState} />
						</div>
						<div className="input-group input-group-lg">
							<Selection default="District" options={Object.keys(districts)} value={district} handleChange={setDistrict} />
						</div>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-2">
					<div className="mx-2 my-4 cases-types h3 py-4 d-flex flex-column justify-content-around" style ={{ backgroundColor: '#fd7e14' }}>
						<span>Confirmed</span>
						<span>{data[0] && district ? new Intl.NumberFormat('en-IN').format(data[0]['value']) : '-'}</span>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-2">
					<div className="mx-2 my-4 bg-primary cases-types h3 py-4 d-flex flex-column justify-content-around">
						<span>Active</span>
						<span>{data[1] && district ? new Intl.NumberFormat('en-IN').format(data[1]['value']) : '-'}</span>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-2">
					<div className="mx-2 my-4 bg-danger cases-types h3 py-4 d-flex flex-column justify-content-around">
						<span>Deceased</span>
						<span>{data[2] && district ? new Intl.NumberFormat('en-IN').format(data[2]['value']) : '-'}</span>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-2">
					<div className="mx-2 my-4 bg-success cases-types h3 py-4 d-flex flex-column justify-content-around">
						<span>Recovered</span>
						<span>{data[3] && district ? new Intl.NumberFormat('en-IN').format(data[3]['value']) : '-'}</span>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-2">
					<div className="mx-2 my-4 cases-types h3 py-4 d-flex flex-column justify-content-around" style={{ backgroundColor: "#6610f2" }}>
						<span>Tested</span>
						<span>{data[4] && district ? new Intl.NumberFormat('en-IN').format(data[4]['value']) : '-'}</span>
					</div>
				</div>
			</div>
			{graphs && state ? <div><div className="row text-center">
				<div className="col-12 col-md-12 col-lg-12 col-xl-12">
					<div className="d-flex flex-column">
						<div className="m-2 dist-graph">
							<Graph data={graphs[0]} type1="confirmed" type2="active" fill1="#fd7e14" fill2="#007bff" />
						</div>
						<div className="m-2 dist-graph">
							<Graph data={graphs[1]} type1="recovered" type2="deceased" fill1="#28a745" fill2="#dc3545" />
						</div>
					</div>
				</div>
			</div></div> : null}
			
		</div>
	)
}