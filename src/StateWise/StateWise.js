import React, { useState, useEffect } from 'react'
import StateWiseContainer from './StateWiseContainer'

export default function StateWise() {
	const [ type, setType ] = useState(0)
	const [ data, setData ] = useState([])
	const colors = [
		{ backgroundColor: '#6610f244', color: '#6610f2' },
		{ backgroundColor: '#007bff44', color: '#007bff' },
		{ backgroundColor: '#dc354544', color: '#dc3545' },
		{ backgroundColor: '#28a74544', color: '#28a745' },
		{ backgroundColor: '#e83e8c44', color: '#e83e8c' },
	]
	useEffect(() => {
		fetch("https://api.covid19india.org/v4/data.json")
		.then(rawResponse => rawResponse.json())
		.then(response => {
			let data = [[], [], [], [], []]
			for(const stateid in response) {
				const total =  response[stateid]['total']
				const types = [ 'confirmed', 'active', 'deceased', 'recovered', 'tested', 'other']
				const current = [
					total[types[0]] || 0,
					(total[types[0]] || 0) - (total[types[2]] || 0) - (total[types[3]] || 0) - (total[types[5]] || 0),
					total[types[2]] || 0,
					total[types[3]] || 0,
					total[types[4]] || 0
				]
				if(stateid !== 'TT')
					for(let i=0;i<5;++i)
						data[i].push({state: stateid, [types[i]]: current[i]})
			}
			setData(data)
		})
		document.title = 'StateWise Covid-19 Tracker';
	}, [])
	return (
		<StateWiseContainer colors={colors} type={type} data={data[type]} setType={setType} />
	)
}