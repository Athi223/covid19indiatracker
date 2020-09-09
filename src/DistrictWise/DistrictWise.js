import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Selection from './Selection'
import Graph from './Graph'
import './DistrictWise.css'

export default function DistrictWise(props) {
    const [ state, setState ] = useState(null)
    const [ data, setData ] = useState([])
    const [ districts, setDistricts ] = useState([])
    const [ district, setDistrict] = useState('')
    const [ graphs, setGraphs ] = useState(null)
    useEffect(() => {
        if(state) {
            const districtData = props.districts[state]
            let graphs = [[], [], [], [], []]
            setDistricts(districtData)
            for(const district in districtData) {
                const confirmed = districtData[district].total.confirmed
                const deceased = districtData[district].total.deceased
                const recovered = districtData[district].total.recovered
                const tested = districtData[district].total.tested
                graphs[0].push({ district: district, confirmed: confirmed })
                graphs[1].push({ district: district, active: (confirmed - deceased - recovered)})
                graphs[2].push({ district: district, deceased: deceased})
                graphs[3].push({ district: district, recovered: recovered})
                graphs[4].push({ district: district, tested: tested})
            }
            setGraphs(graphs)
            setDistrict('')
        }
    }, [props.districts, state])
    useEffect(() => {
        if(district) {
            let data = []
            const confirmed = districts[district].total.confirmed
            const deceased = districts[district].total.deceased
            const recovered = districts[district].total.recovered
            const tested = districts[district].total.tested
            data.push(confirmed)
            data.push(confirmed - deceased - recovered)
            data.push(deceased)
            data.push(recovered)
            data.push(tested)
            setData(data)
        }
    }, [district, districts])
    return(
        <div className="container-fluid">
            <div className="row text-center">
                <div className="col-12 col-md-6 col-lg-2 col-xl-2 py-4 d-flex justify-content-around flex-column">
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="state" style={{ fontWeight: "bold" }}>State: </label>
                        </div>
                        <Selection default="State" options={Object.keys(props.districts)} handleChange={setState} />
                    </div>
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="state" style={{ fontWeight: "bold" }}>District: </label>
                        </div>
                        <Selection default="District" options={Object.keys(districts)} value={district} handleChange={setDistrict} />
                    </div>
				</div>
				<div className="col-12 col-md-6 col-lg-2 col-xl-2">
					<div className="mx-2 my-4 cases-types h3 p-4 d-flex flex-column justify-content-around" style ={{ backgroundColor: '#fd7e14' }}>
						<span>Confirmed</span>
						<span>{data[0] && district ? new Intl.NumberFormat('en-IN').format(data[0]) : '-'}</span>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-2 col-xl-2">
					<div className="mx-2 my-4 bg-primary cases-types h3 p-4 d-flex flex-column justify-content-around">
						<span>Active</span>
						<span>{data[1] && district ? new Intl.NumberFormat('en-IN').format(data[1]) : '-'}</span>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-2 col-xl-2">
					<div className="mx-2 my-4 bg-danger cases-types h3 p-4 d-flex flex-column justify-content-around">
						<span>Deceased</span>
						<span>{data[2] && district ? new Intl.NumberFormat('en-IN').format(data[2]) : '-'}</span>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-2 col-xl-2">
					<div className="mx-2 my-4 bg-success cases-types h3 p-4 d-flex flex-column justify-content-around">
						<span>Recovered</span>
						<span>{data[3] && district ? new Intl.NumberFormat('en-IN').format(data[3]) : '-'}</span>
					</div>
				</div>
                <div className="col-12 col-md-6 col-lg-2 col-xl-2">
					<div className="mx-2 my-4 cases-types h3 p-4 d-flex flex-column justify-content-around" style={{ backgroundColor: "#6610f2" }}>
						<span>Tested</span>
						<span>{data[4] && district ? new Intl.NumberFormat('en-IN').format(data[4]) : '-'}</span>
					</div>
				</div>
			</div>
            {graphs ? <div><div className="row text-center px-5">
                <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                    <h4 style={{ color: "#fd7e14" }}>Confirmed</h4>
                    <div className="m-2 graph">
                        <Graph data={graphs[0]} type="confirmed" fill="#fd7e14" />
                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                    <h4 className="text-primary">Active</h4>
                    <div className="m-2 graph">
                        <Graph data={graphs[1]} type="active" fill="#007bff" />
                    </div>
                </div>
            </div>
            <div className="row text-center px-5">
                <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                    <h4 className="text-danger">Deceased</h4>
                    <div className="m-2 graph">
                        <Graph data={graphs[2]} type="deceased" fill="#dc3545" />
                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                    <h4 className="text-success">Recovered</h4>
                    <div className="m-2 graph">
                        <Graph data={graphs[3]} type="recovered" fill="#28a745" />
                    </div>
                </div>
            </div></div> : null}
        </div>
    )
}