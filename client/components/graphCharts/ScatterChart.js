import React, { Component } from "react";

import {
	VictoryScatter,
	VictoryChart,
	VictoryAxis,
	VictoryStack,
	VictoryTheme,
	VictoryTooltip,
	VictoryLabel,
	VictoryVoronoiContainer,
} from "victory";

export default class ScatterChart extends Component {
	render() {
		console.log("**BG props", this.props);
		const { data, dataset, x, y } = this.props;
		console.log("DATA", x);

		return (
			<div id='graph'>
				<VictoryChart
					theme={VictoryTheme.material}
					style={{ parent: { maxWidth: "100%" } }}
					domainPadding={45}
					width={500}
					height={350}
					padding={{ left: 100, right: 25, top: 35, bottom: 75 }}
					containerComponent={
						<VictoryVoronoiContainer
							labels={(data) =>
								`${x}: ${data.datum[x]}, ${y}: ${data.datum[y]}`
							}
						/>
					}>
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
						fixLabelOverlap={true}
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
					{/* <VictoryStack> */}
					<VictoryScatter
						data={data.map((d) => {
							console.log("*d*>>>", d);
							return d;
						})}
						x={x}
						y={y}
						events={[
							{
								target: "data",
								eventHandlers: {
									onMouseOver: () => {
										return [
											{
												target: "data",
												mutation: () => ({
													style: {
														fill: "red",
														strokeWidth: "10px",
													},
												}),
											},
										];
									},
									onMouseOut: () => {
										return [
											{
												target: "data",
												mutation: () => {},
											},
										];
									},
								},
							},
						]}
						// animate={{
						//   duration: 2000,
						//   onLoad: { duration: 1000 },
						// }}
					/>
					{/* </VictoryStack> */}
				</VictoryChart>
			</div>
		);
	}
}
