import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import './StateWise.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { states } from '../States'

export default function StateWise(props) {
	const colors = [ '#fd7e14', '#007bff', '#dc3545', '#28a745', '#6610f2', '#f8bb04', '#ff69b4' ]
	React.useEffect(() => {
		document.title = "State Wise"
	}, [])
    return(
        <div style={{ height: "77vh" }}>
			<div className="container">
				<Buttons setType={props.setType} type={props.type} colors={colors} />
			</div>
			<ResponsiveContainer>
				<BarChart data={props.states} margin={{ left: 35, right: 20 }} >
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="state" />
					<YAxis />
					<Tooltip labelFormatter={stateid => states[stateid]} formatter={value => new Intl.NumberFormat('en-IN').format(value)} />
					<Bar dataKey={['confirmed', 'active', 'deceased', 'recovered', 'tested', 'vaccinated1', 'vaccinated2'][props.type]} fill={colors[props.type]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
    )
}

function Buttons(props) {
	let styles = []
	for(let i=0;i<7;++i) {
		styles.push({
			backgroundColor: props.colors[i] + (props.type === i ? '67' : '44'),
			color: props.colors[i] + (props.type === i ? '' : 'aa'),
			boxShadow: '0 0 ' + (props.type === i ? 6 : 0) + 'px ' + (props.type === i ? 3 : 0) + 'px ' + props.colors[i]
		})
	}
	return(
		<div className="row my-3 text-center" style={{ backgroundColor: 'whitesmoke', borderRadius: 14 }}>
			<div className="col-md">
				<div className="cases-type p-2 my-3" style={styles[0]} onClick={() => props.setType(0)}>Confirmed</div>
			</div>
			<div className="col-md">
				<div className="cases-type p-2 my-3" style={styles[1]} onClick={() => props.setType(1)}>Active</div>
			</div>
			<div className="col-md">
				<div className="cases-type p-2 my-3" style={styles[2]} onClick={() => props.setType(2)}>Deceased</div>
			</div>
			<div className="col-md">
				<div className="cases-type p-2 my-3" style={styles[3]} onClick={() => props.setType(3)}>Recovered</div>
			</div>
			<div className="col-md">
				<div className="cases-type p-2 my-3" style={styles[4]} onClick={() => props.setType(4)}>Tested</div>
			</div>
			<div className="col-md">
				<div className="cases-type p-2 my-3" style={styles[5]} onClick={() => props.setType(5)}>1 Dose</div>
			</div>
			<div className="col-md">
				<div className="cases-type p-2 my-3" style={styles[6]} onClick={() => props.setType(6)}>2 Doses</div>
			</div>
		</div>
	)
}