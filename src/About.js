import React, { useEffect } from 'react'
import './About.css'

export default function About() {
	useEffect(() => {
		document.title = "About"
	}, [])
	return(
		<div className="about p-4">
			<h2>Covid-19 India Tracker & Predictor</h2>
			<h4>Made by <i>github.com/Athi223</i></h4>
			<br />
			<span><h5>APIs & Tools used:</h5>
				<ul className="mt-n3">
					<li><u><a href="https://api.covid19india.org" target="_blank" rel="noopener noreferrer">Covid-19 India API</a></u></li>
					<li><u><a href="https://covid19api.com" target="_blank" rel="noopener noreferrer">Covid-19 API</a></u></li>
					<li className="margin-5"><u><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">ReactJS</a></u></li>
					<li className="margin-5"><u><a href="https://flask.palletsprojects.com" target="_blank" rel="noopener noreferrer">Flask</a></u></li>
				</ul>
			</span>
			<br />
			<span><h5>Machine Learning Algorithms used:</h5>
				<ul className="mt-n3">
					<li>Polynomial Regression (Predictions)</li>
					<li className="margin-5">K-Medoids (Clustering)</li>
				</ul>

			</span>
		</div>
	)
}