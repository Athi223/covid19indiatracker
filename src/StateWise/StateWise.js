import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import './StateWise.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { states } from '../States'

export default function StateWise(props) {
	const colors = [ '#fd7e14', '#007bff', '#dc3545', '#28a745', '#6610f2' ]
	React.useEffect(() => {
		document.title = "State Wise"
	}, [])
    return(
        <div style={{ height: "80vh", width:"100vw" }}>
			<div className="container">
				<Buttons setType={props.setType} type={props.type} colors={colors} />
			</div>
			<ResponsiveContainer>
				<BarChart data={props.states} margin={{ left: 20, right: 20 }} >
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="state" />
					<YAxis />
					<Tooltip labelFormatter={stateid => states[stateid]} formatter={value => new Intl.NumberFormat('en-IN').format(value)} />
					<Bar dataKey={['confirmed', 'active', 'deceased', 'recovered', 'tested'][props.type]} fill={colors[props.type]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
    )
}

function Buttons(props) {
	let styles = []
	for(let i=0;i<5;++i) {
		styles.push({
			backgroundColor: props.colors[i] + (props.type === i ? '67' : '44'),
			color: props.colors[i] + (props.type === i ? '' : 'aa'),
			boxShadow: '0 0 ' + (props.type === i ? 6 : 0) + 'px ' + (props.type === i ? 3 : 0) + 'px ' + props.colors[i]
		})
	}
	return(
		<div className="row my-4 text-center" style={{ backgroundColor: 'whitesmoke', borderRadius: 14 }}>
			<div className="col-6 col-md-4 col-lg-2 col-xl-2">
				<div className="p-2 my-3 font-weight-bold" style={{ fontSize: 20 }}>Category :</div>
			</div>
			<div className="col-6 col-md-4 col-lg-2 col-xl-2">
				<div className="cases-type p-2 my-3" style={styles[0]} onClick={() => props.setType(0)}>Confirmed</div>
			</div>
			<div className="col-6 col-md-4 col-lg-2 col-xl-2">
				<div className="cases-type p-2 my-3" style={styles[1]} onClick={() => props.setType(1)}>Active</div>
			</div>
			<div className="col-6 col-md-4 col-lg-2 col-xl-2">
				<div className="cases-type p-2 my-3" style={styles[2]} onClick={() => props.setType(2)}>Deceased</div>
			</div>
			<div className="col-6 col-md-4 col-lg-2 col-xl-2">
				<div className="cases-type p-2 my-3" style={styles[3]} onClick={() => props.setType(3)}>Recovered</div>
			</div>
			<div className="col-6 col-md-4 col-lg-2 col-xl-2">
				<div className="cases-type p-2 my-3" style={styles[4]} onClick={() => props.setType(4)}>Tested</div>
			</div>
		</div>
	)
}