import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import nFormatter from '../nFormatter'

export default function Graph(props) {
    return(
        <ResponsiveContainer>
            <BarChart data={props.data}>
                <XAxis dataKey="district" tickMargin={5} />
                <YAxis tickFormatter={value => nFormatter(value)} />
                <CartesianGrid />
                <Tooltip />
                <Bar dataKey={props.type1} fill={props.fill1} />
                <Bar dataKey={props.type2} fill={props.fill2} />
            </BarChart>
        </ResponsiveContainer>
    )
}