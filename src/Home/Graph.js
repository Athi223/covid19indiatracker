import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function Graph(props) {
    return(
        <ResponsiveContainer>
            <LineChart data={props.data} margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey={props.dataKey} stroke={props.stroke} />
            </LineChart>
        </ResponsiveContainer>
    )
}