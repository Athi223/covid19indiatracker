import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import './StateWise.css'
import { states } from '../States'
import nFormatter from '../nFormatter'

export default function StateWise(props) {
	const colors = [ '#fd7e14', '#007bff', '#dc3545', '#28a745', '#6610f2' ]
	React.useEffect(() => {
		document.title = "State Wise"
	}, [])
    return(
        <div style={{ height: "80vh", width:"98vw" }}>
			<div className="container">
				<Buttons setType={props.setType} type={props.type} colors={colors} />
			</div>
			<ResponsiveContainer>
				<BarChart data={props.states} >
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="state" tickMargin={5} />
					<YAxis tickFormatter={value => nFormatter(value)} />
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
		<div className="card border-0 my-3 p-0" style={{ boxShadow: "0 0 12px 4px #888" }}>
			<div className="row text-center mx-2" style={{ borderRadius: 14 }}>
				<div className="col-6 col-md-4 col-lg-2 col-xl-2 mb-3 mt-4">
					<div className="p-2 font-weight-bold card-title" style={{ fontSize: 20 }}>Category :</div>
				</div>
				<div className="col-6 col-md-4 col-lg-2 col-xl-2 mb-3 mt-4">
					<div className="cases-type p-2" style={styles[0]} onClick={() => props.setType(0)}>Confirmed</div>
				</div>
				<div className="col-6 col-md-4 col-lg-2 col-xl-2 mb-3 mt-4">
					<div className="cases-type p-2" style={styles[1]} onClick={() => props.setType(1)}>Active</div>
				</div>
				<div className="col-6 col-md-4 col-lg-2 col-xl-2 mb-3 mt-4">
					<div className="cases-type p-2" style={styles[2]} onClick={() => props.setType(2)}>Deceased</div>
				</div>
				<div className="col-6 col-md-4 col-lg-2 col-xl-2 mb-3 mt-4">
					<div className="cases-type p-2" style={styles[3]} onClick={() => props.setType(3)}>Recovered</div>
				</div>
				<div className="col-6 col-md-4 col-lg-2 col-xl-2 mb-3 mt-4">
					<div className="cases-type p-2" style={styles[4]} onClick={() => props.setType(4)}>Tested</div>
				</div>
			</div>
		</div>
	)
}