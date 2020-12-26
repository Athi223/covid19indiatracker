import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import nFormatter from '../nFormatter'

export default function Graph(props) {
	return(
		<ResponsiveContainer>
			<LineChart data={props.data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" tickMargin={5} />
				<YAxis tickFormatter={value => nFormatter(value)} />
				<Tooltip />
				<Line type="monotone" dataKey={props.dataKey} stroke={props.stroke} />
			</LineChart>
		</ResponsiveContainer>
	)
}