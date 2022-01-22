import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function PieGraph(props) {
	const colors = [ '#dc3545', '#6610f2', '#28a745' ]
	const renderLabel = function(entry) {
		return entry.name + " (" + new Intl.NumberFormat('en-IN').format(entry.value) + ")"
	}
	return (
		<ResponsiveContainer>
			<PieChart margin={{ top: 15 }}>
				<Pie data={props.vaccinations} dataKey="value" nameKey="name" cx="50%" cy="50%" label={renderLabel}>
					{colors.map((color, index) => <Cell key={index} fill={color}/>)}
				</Pie>
				<Tooltip formatter={value => new Intl.NumberFormat('en-IN').format(value)} />
			</PieChart>
		</ResponsiveContainer>
	)
}