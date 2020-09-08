import React, { useState, useEffect } from 'react';
import AppComponent from './AppComponent'
import Loader from './Loader'

export default function App() {
	const [ confirmed, setConfirmed ] = useState([])
	const [ active, setActive ] = useState([])
	const [ deceased, setDeceased ] = useState([])
	const [ recovered, setRecovered ] = useState([])
	const [ tested, setTested ] = useState(0)
	const [ ready, setReady ] = useState(false)
	const [ type, setType ] = useState(0)
	const [ states, setStates ] = useState([])
	const [ title, setTitle ] = useState('Covid-19 India Tracker')
	useEffect(() => {
		fetch('https://api.covid19india.org/data.json')
		.then(rawResponse => rawResponse.json())
		.then(response => {
			let confirmed = [], active = [], deceased = [], recovered = []
			response.cases_time_series.forEach(day => {
				const confirm = day.totalconfirmed
				const decease = day.totaldeceased
				const recover = day.totalrecovered
				confirmed.push({ date: day.date, confirmed: confirm })
				active.push({ date: day.date, active: (confirm - decease - recover).toString() })
				deceased.push({ date: day.date, deceased: decease })
				recovered.push({ date: day.date, recovered: recover })
			})
			setConfirmed(confirmed)
			setActive(active)
			setDeceased(deceased)
			setRecovered(recovered)
			setTested(new Intl.NumberFormat('en-IN').format(response.tested[response.tested.length-1].totalsamplestested))
		})
		fetch("https://api.covid19india.org/v4/data.json")
		.then(rawResponse => rawResponse.json())
		.then(response => {
			let states = [[], [], [], [], []]
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
						states[i].push({state: stateid, [types[i]]: current[i]})
			}
			setStates(states)
			setReady(true)
		})
	}, [])
	useEffect(() => {
		document.title = title
	}, [title])
	if(ready)
		return(
			<AppComponent
				confirmed={confirmed}
				active={active}
				deceased={deceased}
				recovered={recovered}
				tested={tested}
				states={states[type]}
				type={type}
				setType={setType}
				setTitle={setTitle}
			/>
		)
	else
		return(<Loader />)
}