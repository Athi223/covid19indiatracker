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
	const [ districts, setDistricts ] = useState({})
	const [ world, SetWorld ] = useState({})
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
			fetch('https://api.covid19api.com/world/total')
			.then(rawResponse => rawResponse.json())
			.then(response => {
				const world = [
					{ type: 'Confirmed', India: parseInt(confirmed[confirmed.length-1].confirmed), World: response.TotalConfirmed },
					{ type: 'Active', India: parseInt(active[active.length-1].active), World: (response.TotalConfirmed - response.TotalDeaths - response.TotalRecovered) },
					{ type: 'Recovered', India: parseInt(recovered[recovered.length-1].recovered), World: response.TotalRecovered },
					{ type: 'Deceased', India: parseInt(deceased[deceased.length-1].deceased), World: response.TotalDeaths },
				]
				SetWorld(world)
			})
		})
		fetch("https://api.covid19india.org/v4/data.json")
		.then(rawResponse => rawResponse.json())
		.then(response => {
			let states = [[], [], [], [], []], districts = {}
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
				if(stateid !== 'TT') {
					districts[stateid] = response[stateid]['districts']
					for(let i=0;i<5;++i)
						states[i].push({state: stateid, [types[i]]: current[i]})
				}
			}
			setStates(states)
			setDistricts(districts)
			setReady(true)
		})
	}, [])
	if(ready)
		return(
			<AppComponent
				confirmed={confirmed}
				active={active}
				deceased={deceased}
				recovered={recovered}
				tested={tested}
				states={states}
				districts={districts}
				type={type}
				world={world}
				setType={setType}
			/>
		)
	else
		return(<Loader />)
}