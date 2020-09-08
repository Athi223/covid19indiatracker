import React from 'react'

export default function Selection(props) {
    return (
        <select className="custom-select" onChange={props.onChange} value={props.value} >
            <option value=''>Select {props.default}</option>
            {Object.keys(props.options).map((entry, index) => <option key={index} value={entry}>{entry}</option>)}
        </select>
    )
}