import React from 'react'
import loader from './loader.svg';
import './Loader.css';

export default function Loader() {
	return <div className="wrapper"><img src={loader} className="loader" alt="loader" /></div>
}