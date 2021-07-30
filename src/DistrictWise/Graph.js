import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function Graph(props) {
    return(
        <ResponsiveContainer>
            <BarChart data={props.data} margin={{ left: 20 }}>
                <XAxis dataKey="district" />
                <YAxis scale="sqrt" />
                <CartesianGrid />
                <Tooltip />
                <Bar dataKey={props.type1} fill={props.fill1} />
                <Bar dataKey={props.type2} fill={props.fill2} stackId="vaccinated" />
                {props.type3 ? <Bar dataKey={props.type3} fill={props.fill3} stackId="vaccinated" /> : null}
            </BarChart>
        </ResponsiveContainer>
    )
}