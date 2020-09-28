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
	const [ world, SetWorld ] = useState([])
	// Prediction
	const [ annual_dates, setAnnual_dates ] = useState([])
	const [ annual_prediction, setAnnual_prediction ] = useState([])
	const [date, setDate] = useState(null)
	useEffect(() => {
		fetch('/api').then(rawResponse => rawResponse.json())
		.then(response => {
			fetch('https://api.covid19api.com/world/total')
			.then(raw => raw.json())
			.then(res => {
				const world = [
					{ type: 'Confirmed', India: parseInt(response.data.confirmed[response.data.confirmed.length-1].confirmed), World: res.TotalConfirmed },
					{ type: 'Active', India: parseInt(response.data.active[response.data.active.length-1].active), World: (res.TotalConfirmed - res.TotalDeaths - res.TotalRecovered) },
					{ type: 'Recovered', India: parseInt(response.data.recovered[response.data.recovered.length-1].recovered), World: res.TotalRecovered },
					{ type: 'Deceased', India: parseInt(response.data.deceased[response.data.deceased.length-1].deceased), World: res.TotalDeaths },
				]
				SetWorld(world)
				setConfirmed(response.data.confirmed)
				setActive(response.data.active)
				setDeceased(response.data.deceased)
				setRecovered(response.data.recovered)
				setTested(new Intl.NumberFormat('en-IN').format(response.data.tested))
				setStates(response.data.states)
				setDistricts(response.data.districts)
				setReady(true)
				setAnnual_dates(response.annual_dates)
				setAnnual_prediction(response.annual_prediction)
			})
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
				annual_dates={annual_dates}
				annual_prediction={annual_prediction}
				date={date}
				setDate={setDate}
			/>
		)
	else
		return(<Loader />)
}