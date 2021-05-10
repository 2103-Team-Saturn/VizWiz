import React, { Component } from "react";

import {
	VictoryBar,
	VictoryChart,
	VictoryAxis,
	VictoryStack,
	VictoryTheme,
	VictoryTooltip,
	VictoryLabel,
} from "victory";

export default class BarGraph extends Component {
	render() {
		console.log("**BG props", this.props);
		const { data, dataset, x, y } = this.props;

		return (
			<div id='graph'>
				<VictoryChart
					theme={VictoryTheme.material}
					style={{ parent: { maxWidth: "100%" } }}
					domainPadding={45}
					width={500}
					height={350}
					padding={{ left: 100, right: 25, top: 35, bottom: 75 }}>
					<VictoryLabel
						text={dataset}
						style={{
							fontSize: 20,
							textAnchor: "start",
							verticalAnchor: "end",
							fill: "#455A64",
							fontFamily: "inherit",
						}}
						x={100}
						y={24}
					/>
					<VictoryAxis
						label={x}
						style={{
							axis: { stroke: "#756f6a" },
							axisLabel: { fontSize: 16, padding: 60 },
							tickLabels: { angle: 20 },
						}}
						tickValues={data.map((d) => d[x])}
						fixLabelOverlap={true}

						//   tickFormat={data.map(d => {
						//     if (typeof d[x] === 'string') {
						//       if (x === 'Month') {
						//         return d[x].slice(0, 3)
						//       } else {
						//         return d[x]
						//       }
						//     } else {
						//       return d[x]
						//     }
						//   })}
					/>
					<VictoryAxis
						dependentAxis
						label={y}
						style={{
							axis: { stroke: "#756f6a" },
							axisLabel: { fontSize: 16, padding: 80 },
						}}
						fixLabelOverlap={true}
					/>
					<VictoryBar
						data={data.map((d) => {
							console.log("*d*>>>", d);
							return d;
						})}
						x={x}
						y={y}
						// domain={ {x: [0, x.length + 1], y: [0, (Math.max(...y) + 20) ] } }
						barRatio={1.0}
						style={{
							data: {
								fill: "#c43a31",
								width: 24,
							},
						}}
					/>
				</VictoryChart>
			</div>
		);
	}
}
