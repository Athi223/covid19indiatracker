import React, { useEffect } from 'react'
import './About.css'
import Coronavirus from './Coronavirus'

export default function About() {
	useEffect(() => {
		document.title = "About"
	}, [])
	return(
		<div className="about">
			<Coronavirus />
			<h1 className="mt-3">Covid-19 India Tracker</h1><br />
			<h3>Made by <u><i><a href="github.com/Athi223" target="_blank" rel="noopener noreferrer">Athi223</a></i></u></h3><br />
			<h5>Credits: 
				<ul className="list">
					<li><u><a href="https://api.covid19india.org" target="_blank" rel="noopener noreferrer">Covid-19 India API</a></u></li>
					<li><u><a href="https://covid19api.com" target="_blank" rel="noopener noreferrer">Covid-19 API</a></u></li>
				</ul>
			</h5>
		</div>
	)
}