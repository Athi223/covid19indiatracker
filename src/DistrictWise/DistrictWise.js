import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Selection from './Selection'

export default function DistrictWise(props) {
    const [ state, setState ] = useState(null)
    const [ data, setData ] = useState([])
    const [ districts, setDistricts ] = useState([])
    const [ district, setDistrict] = useState('')
    const stateChange = (event) => {
        setState(event.target.value)
        setDistricts(props.districts[event.target.value].districtData)
        setDistrict('')
    }
    const districtChange = (event) => {
        setDistrict(event.target.value)
    }
    useEffect(() => {
        if(state && district) {
            let data = []
            data.push(props.districts[state].districtData[district].confirmed)
            data.push(props.districts[state].districtData[district].active)
            data.push(props.districts[state].districtData[district].deceased)
            data.push(props.districts[state].districtData[district].recovered)
            setData(data)
        }
    }, [district, props.districts, state])
    return(
        <div className="container mt-4">
            <div className="input-group input-group-lg mb-4">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="state" style={{ fontWeight: "bold" }}>State: </label>
                </div>
                <Selection default="State" options={props.districts} onChange={stateChange} />
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="state" style={{ fontWeight: "bold" }}>District: </label>
                </div>
                <Selection default="District" options={districts} value={district} onChange={districtChange} />
            </div>
            <div className="row text-center">
				<div className="col-12 col-md-6 col-lg-3 col-xl-3">
					<div className="mx-2 my-4 cases-types h3 p-4 d-flex flex-column justify-content-around" style ={{ backgroundColor: '#fd7e14' }}>
						<span>Confirmed</span>
						<span>{data[0] ? new Intl.NumberFormat('en-IN').format(data[0]) : '-'}</span>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-3 col-xl-3">
					<div className="mx-2 my-4 bg-primary cases-types h3 p-4 d-flex flex-column justify-content-around">
						<span>Active</span>
						<span>{data[0] ? new Intl.NumberFormat('en-IN').format(data[1]) : '-'}</span>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-3 col-xl-3">
					<div className="mx-2 my-4 bg-danger cases-types h3 p-4 d-flex flex-column justify-content-around">
						<span>Deceased</span>
						<span>{data[0] ? new Intl.NumberFormat('en-IN').format(data[2]) : '-'}</span>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-3 col-xl-3">
					<div className="mx-2 my-4 bg-success cases-types h3 p-4 d-flex flex-column justify-content-around">
						<span>Recovered</span>
						<span>{data[0] ? new Intl.NumberFormat('en-IN').format(data[3]) : '-'}</span>
					</div>
				</div>
			</div>
        </div>
    )
}