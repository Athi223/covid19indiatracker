import React, { useState, useEffect } from 'react';
import { usePapaParse } from 'react-papaparse';
import AppComponent from './AppComponent'
import Loader from './Loader'

export default function App() {
	const [ confirmed, setConfirmed ] = useState([])
	const [ active, setActive ] = useState([])
	const [ deceased, setDeceased ] = useState([])
	const [ recovered, setRecovered ] = useState([])
	const [ tested, setTested ] = useState([])
	const [ vaccinations, setVaccinations ] = useState({})
	const [ ready, setReady ] = useState(0)
	const [ type, setType ] = useState(0)
	const [ states, setStates ] = useState([])
	const [ districts, setDistricts ] = useState({})
	const [ world, SetWorld ] = useState([])
	const { readRemoteFile } = usePapaParse()
	useEffect(() => {
		fetch('https://data.covid19bharat.org/v4/min/timeseries.min.json')
		.then(rawResponse => rawResponse.json())
		.then(response => {
			let confirmed = [], active = [], deceased = [], recovered = [], tested = []
			for(let date in response['TT']['dates']) {
				const confirm = response['TT']['dates'][date]['total'].confirmed
				const decease = response['TT']['dates'][date]['total'].deceased
				const recover = response['TT']['dates'][date]['total'].recovered
				const test = response['TT']['dates'][date]['total'].tested
				if(confirm) {
					confirmed.push({ date: date, confirmed: confirm })
					active.push({ date: date, active: (confirm - (decease || 0) - (recover || 0)).toString() })
				}
				if(decease) {
					deceased.push({ date: date, deceased: decease })
				}
				if(recover) {
					recovered.push({ date: date, recovered: recover })
				}
				if(test) {
					tested.push({ date: date, tested: test })
				}
			}
			setConfirmed(confirmed)
			setActive(active)
			setDeceased(deceased)
			setRecovered(recovered)
			setTested(tested)
			fetch('https://corona.lmao.ninja/v2/all')
			.then(rawResponse => rawResponse.json())
			.then(response => {
				const world = [
					{ type: 'Confirmed', India: parseInt(confirmed[confirmed.length-1].confirmed), World: response.cases },
					{ type: 'Active', India: parseInt(active[active.length-1].active), World: response.active },
					{ type: 'Recovered', India: parseInt(recovered[recovered.length-1].recovered), World: response.recovered },
					{ type: 'Tested', India: parseInt(tested[tested.length-1].tested), World: response.tests },
					{ type: 'Deceased', India: parseInt(deceased[deceased.length-1].deceased), World: response.deaths },
				]
				SetWorld(world)
			})
			setReady(prev => prev + 1)
		})
		fetch("https://data.covid19bharat.org/v4/min/data.min.json")
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
		readRemoteFile("https://data.covid19bharat.org/csv/latest/cowin_vaccine_data_statewise.csv", {
			complete: (results) => {
				const latest = results.data[results.data.length-1]				// Last Row current latest country data
				const genderwise = [
					{ name: 'Males', value: latest[8] },
					{ name: 'Females', value: latest[9] },
					{ name: 'Transgender', value: latest[10] },
				]
				const dosewise = [
					{ name: '1 Dose', value: latest[5] },
					{ name: '2 Doses', value: latest[6] },
					{ name: 'Precautionary Dose', value: latest[7] },
				]
				const vaccinewise = [
					{ name: 'Covaxin', value: latest[11] },
					{ name: 'Covishield', value: latest[12] },
					{ name: 'Sputnik V', value: latest[13] },
				]
				const agewise = [
					{ name: '18-44 Years', value: latest[15] },
					{ name: '45-60 Years', value: latest[16] },
					{ name: '60+ Years', value: latest[17] },
				]
				setVaccinations({
					genderwise: genderwise,
					dosewise: dosewise,
					vaccinewise: vaccinewise,
					agewise: agewise
				})
				setReady(prev => prev + 1)
			},
			dynamicTyping: true
		})
	}, [readRemoteFile])
	if(ready === 3)
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