import React, { useState, useEffect } from 'react'
import HomeComponent from './HomeComponent'
import Loader from '../Loader'

export default function Home() {
	const [ confirmed, setConfirmed ] = useState([])
	const [ active, setActive ] = useState([])
	const [ deceased, setDeceased ] = useState([])
	const [ recovered, setRecovered ] = useState([])
	const [ tested, setTested ] = useState(0)
	const [ ready, setReady ] = useState(false)
	useEffect(() => {
		fetch('https://api.covid19india.org/data.json')
		.then(rawResponse => rawResponse.json())
		.then(response => {
			let confirmed = [], active = [], deceased = [], recovered = []
			for(const day in response.cases_time_series) {
				const confirm = response.cases_time_series[day].totalconfirmed
				const decease = response.cases_time_series[day].totaldeceased
				const recover = response.cases_time_series[day].totalrecovered
				confirmed.push({ date: response.cases_time_series[day].date, confirmed: confirm })
				active.push({ date: response.cases_time_series[day].date, active: (confirm - decease - recover).toString() })
				deceased.push({ date: response.cases_time_series[day].date, deceased: decease })
				recovered.push({ date: response.cases_time_series[day].date, recovered: recover })
			}
			setConfirmed(confirmed)
			setActive(active)
			setDeceased(deceased)
			setRecovered(recovered)
			setReady(true)
			setTested(new Intl.NumberFormat('en-IN').format(response.tested[response.tested.length-1].totalsamplestested))
		})
		document.title = 'Covid-19 India Tracker';
	}, [])
	if(ready)
		return(
			<HomeComponent confirmed={confirmed} active={active} deceased={deceased} recovered={recovered} tested={tested} />
		)
	else
		return(<Loader />)
}