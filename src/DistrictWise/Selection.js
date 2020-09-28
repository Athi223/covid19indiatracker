import React from 'react'
import { states } from '../States'

export default function Selection(props) {
    const handleChange = (event) => {
        props.handleChange(event.target.value)
    }
    return (
        <select className="custom-select" onChange={handleChange} value={props.value} >
            <option value=''>Select {props.default}</option>
            {props.options.map((entry, i) => <option key={i} value={entry}>{props.default === 'State' ? states[entry] : entry}</option>)}
        </select>
    )
}