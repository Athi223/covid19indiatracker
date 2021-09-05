import React, { useState, useEffect } from 'react';
import AppComponent from './AppComponent'
import Loader from './Loader'

export default function App() {
	const [ confirmed, setConfirmed ] = useState([])
	const [ active, setActive ] = useState([])
	const [ deceased, setDeceased ] = useState([])
	const [ recovered, setRecovered ] = useState([])
	const [ tested, setTested ] = useState(0)
	const [ vaccinations, setVaccinations ] = useState({})
	const [ ready, setReady ] = useState(0)
	const [ type, setType ] = useState(0)
	const [ states, setStates ] = useState([])
	const [ districts, setDistricts ] = useState({})
	const [ world, SetWorld ] = useState([])
	useEffect(() => {
		fetch('https://data.covid19india.org/data.json')
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
			response.tested.reverse()												// reverse the vaccinations data to get latest first
			const data = response.tested.find(e => 
				parseInt(e['totaldosesadministered']) &&
				parseInt(e['firstdoseadministered']) &&
				parseInt(e['frontlineworkersvaccinated1stdose']) &&
				parseInt(e['healthcareworkersvaccinated1stdose']) &&
				parseInt(e['years1stdose']) &&
				parseInt(e['over45years1stdose']) &&
				parseInt(e['over60years1stdose']) &&
				parseInt(e['seconddoseadministered']) &&							// Find the latest vaccinations data which has
				parseInt(e['frontlineworkersvaccinated2nddose']) &&					// all the required stats as valid integers
				parseInt(e['healthcareworkersvaccinated2nddose']) &&
				parseInt(e['years2nddose']) &&
				parseInt(e['over45years2nddose']) &&
				parseInt(e['over60years2nddose']) &&
				parseInt(e['totalindividualsregistered']) &&
				parseInt(e['registration18-45years']) &&
				parseInt(e['registrationabove45years'])
			)
			const _vaccinations = {
				'total': data['totaldosesadministered'],
				'first_doses': {
					'total': data['firstdoseadministered'],
					'stats': [
						{ name: 'Frontline Workers', value: parseInt(data['frontlineworkersvaccinated1stdose']) },
						{ name: 'Healthcare Workers', value: parseInt(data['healthcareworkersvaccinated1stdose']) },
						{ name: 'Under 45 Years', value: parseInt(data['years1stdose']) },
						{ name: 'Over 45 Years', value: parseInt(data['over45years1stdose']) },
						{ name: 'Over 60 Years', value: parseInt(data['over60years1stdose']) },
					]
				},
				'second_doses': {
					'total': data['seconddoseadministered'],
					'stats': [
						{ name: 'Frontline Workers', value: parseInt(data['frontlineworkersvaccinated2nddose']) },
						{ name: 'Healthcare Workers', value: parseInt(data['healthcareworkersvaccinated2nddose']) },
						{ name: 'Under 45 Years', value: parseInt(data['years2nddose']) },
						{ name: 'Over 45 Years', value: parseInt(data['over45years2nddose']) },
						{ name: 'Over 60 Years', value: parseInt(data['over60years2nddose']) },
					]
				},
				'registrations': {
					'total': data['totalindividualsregistered'],
					'stats': [
						{ name: '18-45 Years', value: parseInt(data['registration18-45years']) },
						{ name: 'Above 45 Years', value: parseInt(data['registrationabove45years']) },
					]
				}
			}
			setVaccinations(_vaccinations)
			setConfirmed(confirmed)
			setActive(active)
			setDeceased(deceased)
			setRecovered(recovered)
			setTested(new Intl.NumberFormat('en-IN').format(response.tested[response.tested.length-1].totalsamplestested))
			setReady(prev => prev + 1)
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
		fetch("https://data.covid19india.org/v4/min/data.min.json")
		.then(rawResponse => rawResponse.json())
		.then(response => {
			let states = [[], [], [], [], [], [], []], districts = {}
			for(const stateid in response) {
				const total =  response[stateid]['total']
				const types = [ 'confirmed', 'active', 'deceased', 'recovered', 'tested', '1 Dose', '2 Doses' ]
				const current = [
					total[types[0]] || 0,
					(total[types[0]] || 0) - (total[types[2]] || 0) - (total[types[3]] || 0) - (total['other'] || 0),
					total[types[2]] || 0,
					total[types[3]] || 0,
					total[types[4]] || 0,
					total['vaccinated1'] || 0,
					total['vaccinated2'] || 0
				]
				if(stateid !== 'TT') {
					districts[stateid] = response[stateid]['districts']
					for(let i=0 ;i<current.length; ++i)
						states[i].push({state: stateid, [types[i]]: current[i]})
				}
			}
			setStates(states)
			setDistricts(districts)
			setReady(prev => prev + 1)
		})
	}, [])
	if(ready === 2)
		return(
			<AppComponent
				confirmed={confirmed}
				active={active}
				deceased={deceased}
				recovered={recovered}
				tested={tested}
				states={states}
				districts={districts}
				vaccinations={vaccinations}
				type={type}
				world={world}
				setType={setType}
			/>
		)
	else
		return(<Loader />)
}