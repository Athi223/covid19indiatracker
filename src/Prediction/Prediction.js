import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function Prediction(props) {
	const [confirmed, setConfirmed] = useState(null)
	const [active, setActive] = useState(null)
	const [deceased, setDeceased] = useState(null)
	const [recovered, setRecovered] = useState(null)
	const [date, setDate] = useState(null)
	useEffect(() => {
		document.title = "Prediction"
	}, [])
	useEffect(() => {
		if(date)
			fetch("/prediction", {
				method: "POST",
				body: JSON.stringify({
					date: date,
				}),
				headers: { 
					"Content-type": "application/json; charset=UTF-8"
				}
			})
			.then(rawResponse => rawResponse.json())
			.then(response => {
				setConfirmed(response[0])
				setActive(response[1])
				setDeceased(response[2])
				setRecovered(response[3])
			})
	}, [date])
	let data = []
	for(let i=0;i<12;++i) {
		data.push({
			date: props.annual_dates[i],
			Confirmed: props.annual_prediction[0][i],
			Active: props.annual_prediction[1][i],
			Deceased: props.annual_prediction[2][i],
			Recovered: props.annual_prediction[3][i]
		})
	}
	return(
		<div className="container-fluid">
			<div className="row text-center">
				<div className="col-12 col-md-12 col-lg-2 col-xl-2">
					<div className="mx-2 my-4 cases-types p-4 d-flex flex-column justify-content-around bg-info">
						<h3 className="text-light">Cases Prediction</h3>
						<div className="input-group justify-content-center">
							<div className="input-group-prepend">
								<label class="input-group-text" htmlFor="date">Date</label>
							</div>
							<input type="date" id="date" min={new Date().toISOString().split("T")[0]} value={date} onChange={e => setDate(e.target.value)} />
						</div>
					</div>
				</div>
				<div className="col-12 col-md-12 col-lg-10 col-xl-10">
					<div className="row">
						<div className="col-12 col-md-6 col-lg-3 col-xl-3">
							<div className="mx-2 my-4 cases-types h3 py-4 d-flex flex-column justify-content-around" style ={{ backgroundColor: '#fd7e14' }}>
								<span>Confirmed</span>
								<span>{date ? new Intl.NumberFormat('en-IN').format(confirmed) : '-'}</span>
							</div>
						</div>
						<div className="col-12 col-md-6 col-lg-3 col-xl-3">
							<div className="mx-2 my-4 bg-primary cases-types h3 py-4 d-flex flex-column justify-content-around">
								<span>Active</span>
								<span>{date ? new Intl.NumberFormat('en-IN').format(active) : '-'}</span>
							</div>
						</div>
						<div className="col-12 col-md-6 col-lg-3 col-xl-3">
							<div className="mx-2 my-4 bg-danger cases-types h3 py-4 d-flex flex-column justify-content-around">
								<span>Deceased</span>
								<span>{date ? new Intl.NumberFormat('en-IN').format(deceased) : '-'}</span>
							</div>
						</div>
						<div className="col-12 col-md-6 col-lg-3 col-xl-3">
							<div className="mx-2 my-4 bg-success cases-types h3 py-4 d-flex flex-column justify-content-around">
								<span>Recovered</span>
								<span>{date ? new Intl.NumberFormat('en-IN').format(recovered) : '-'}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mx-auto text-center" style={{ height: "68vh", width: "98vw" }} >
				<h4>Cases Prediction for next 12 Months (Nationwide)</h4>
				<ResponsiveContainer>
					<LineChart data={data} margin={{ left: 20, right: 20 }} >
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip formatter={value => new Intl.NumberFormat('en-IN').format(value)} />
						<Legend />
						<Line type="monotone" dataKey="Confirmed" stroke="#fd7e14" />
						<Line type="monotone" dataKey="Active" stroke="#007bff" />
						<Line type="monotone" dataKey="Deceased" stroke="#dc3545" />
						<Line type="monotone" dataKey="Recovered" stroke="#28a745" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}