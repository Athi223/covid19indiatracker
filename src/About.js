import React from 'react'
import './About.css'

export default function About() {
	return(
		<div className="about">
			<h1>Covid-19 India Tracker</h1><br />
			<h3>Made by <i>github.com/Athi223</i></h3><br />
			<h5>Credits: 
				<ul className="list">
					<li><u><a href="https://api.covid19india.org" target="_blank" rel="noopener noreferrer">Covid-19 India API</a></u></li>
					<li><u><a href="https://covid19api.com" target="_blank" rel="noopener noreferrer">Covid-19 API</a></u></li>
				</ul>
			</h5>
		</div>
	)
}