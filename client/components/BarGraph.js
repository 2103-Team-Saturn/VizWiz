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
    console.log('**BG props', this.props);
    const { data, dataset } = this.props;

    return (
      <div id="graph">Hi, I'm gonna be a graph.
        {/* <VictoryChart
          theme={VictoryTheme.material}
          style={{ parent: { maxWidth: "100%" } }}
          domainPadding={45}
          width={500}
          height={350}
          padding={{ left: 100, right: 25, top: 35, bottom: 75 }}
        >
            <VictoryLabel
              text={data.title}
              style={{
                fontSize: 20,
                textAnchor: 'start',
                verticalAnchor: 'end',
                fill: '#455A64',
                fontFamily: 'inherit'
              }}
              x={100}
              y={24}
            />
        </VictoryChart> */}
      </div>
    );
  }
}
