import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import './StateWise.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StateWiseContainer(props) {
	const states = {
		'AP': 'Andhra Pradesh',
		'AR': 'Arunachal Pradesh',
		'AS': 'Assam',
		'BR': 'Bihar',
		'CT': 'Chhattisgarh',
		'GA': 'Goa',
		'GJ': 'Gujarat',
		'HR': 'Haryana',
		'HP': 'Himachal Pradesh',
		'JH': 'Jharkhand',
		'KA': 'Karnataka',
		'KL': 'Kerala',
		'MP': 'Madhya Pradesh',
		'MH': 'Maharashtra',
		'MN': 'Manipur',
		'ML': 'Meghalaya',
		'MZ': 'Mizoram',
		'NL': 'Nagaland',
		'OR': 'Odisha',
		'PB': 'Punjab',
		'RJ': 'Rajasthan',
		'SK': 'Sikkim',
		'TN': 'Tamil Nadu',
		'TG': 'Telangana',
		'TR': 'Tripura',
		'UT': 'Uttarakhand',
		'UP': 'Uttar Pradesh',
		'WB': 'West Bengal',
		'AN': 'Andaman and Nicobar Islands',
		'CH': 'Chandigarh',
		'DN': 'Dadra and Nagar Haveli',
		'DL': 'Delhi',
		'JK': 'Jammu and Kashmir',
		'LA': 'Ladakh',
		'PY': 'Puducherry' 
	}
    return(
        <div style={{ height: "85vh", width:"100vw" }}>
			<div className="container p-2 my-1 justify-content-between d-flex">
				<div className="cases-type p-2" style={props.colors[0]} onClick={() => props.setType(0)}>Confirmed</div>
				<div className="cases-type p-2" style={props.colors[1]} onClick={() => props.setType(1)}>Active</div>
				<div className="cases-type p-2" style={props.colors[2]} onClick={() => props.setType(2)}>Deceased</div>
				<div className="cases-type p-2" style={props.colors[3]} onClick={() => props.setType(3)}>Recovered</div>
				<div className="cases-type p-2" style={props.colors[4]} onClick={() => props.setType(4)}>Tested</div>
			</div>
			<ResponsiveContainer>
				<BarChart data={props.data} margin={{ left: 20, right: 20 }} >
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="state" />
					<YAxis />
					<Tooltip labelFormatter={(stateid) => states[stateid]} />
					<Bar
						dataKey={['confirmed', 'active', 'deceased', 'recovered', 'tested'][props.type]}
						fill={props.colors[props.type].color}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
    )
}