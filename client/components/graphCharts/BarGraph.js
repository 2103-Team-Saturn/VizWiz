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
    // const { x, y } = this.props;
    const title = this.props.title || this.props.selectedDataset;
    const xTitle = this.props.xTitle || this.props.x;
    const yTitle = this.props.yTitle || this.props.y;
    const color = this.props.color || "#000000";
    const highlight = this.props.highlight || "#A9A9A9";
    const { formattedData } = this.props;
    console.log('formattedData inside BG>>>', formattedData);

    return (
      // <svg 
      // style={ { fill: "black" } } 
      // id="graph-container" 
      // viewBox="0 0 500 350">
        //{" "}
        <div>
        <VictoryChart
          theme={VictoryTheme.material}
          style={{ parent: { maxWidth: "100%" } }}
          domainPadding={45}
          width={500}
          height={350}
          padding={{ left: 100, right: 25, top: 35, bottom: 75 }}
        >
          <VictoryLabel
            text={title}
            style={{
              fontSize: 20,
              textAnchor: "start",
              verticalAnchor: "end",
              fill: "#455A64",
              fontFamily: "inherit",
            }}
            x={250}
            y={25}
          />
          <VictoryLabel
            text={xTitle}
            style={{
              fontSize: 16,
              textAnchor: "start",
              verticalAnchor: "end",
              fill: "#455A64",
              fontFamily: "inherit",
            }}
            x={250}
            y={325}
          />
          <VictoryLabel
            text={yTitle}
            style={{
              fontSize: 16,
              textAnchor: "start",
              verticalAnchor: "end",
              fill: "#455A64",
              fontFamily: "inherit",
            }}
            x={25}
            y={175}
          />
          <VictoryAxis
            // label={xTitle}
            fixLabelOverlap={true}
            style={{
              axis: { stroke: color },
            // axisLabel: { fontSize: 16, padding: 60 },
              tickLabels: { angle: 20 },
            }}
            tickValues={formattedData.map((d) => d['x'])}
            // tickFormat={formattedData.map((d) => {
            //   if (typeof d['x'] === "string") {
            //     if (x === "Month" || x === "Day") {
            //       return d[x].slice(0, 3);
            //     } else {
            //       return d[x];
            //     }
            //   } else {
            //     return d[x];
            //   }
            // })}
          />
          <VictoryAxis
            dependentAxis
            fixLabelOverlap={true}
            // label={y}
            style={{
              axis: { stroke: "#756f6a" },
              axisLabel: { fontSize: 16, padding: 80 },
            }}
          />
          <VictoryStack>
            <VictoryBar
            data={formattedData}
              // data={data.map((datum) => {
              //   let label = `${datum[y]}`;
              //   datum.label = label;
              //   return datum;
              // })}
              labelComponent={
                <VictoryTooltip
                  flyoutStyle={ { fill: "white", stroke: "lightgrey" } }
                  // cornerRadius={+this.props.tooltip}
                  cornerRadius={20}
                />
              }
              // events prop should be given as an array of event objects
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: "data",
                          mutation: () => ({
                            style: { fill: highlight, width: 24 }, // can make all these fills dynamic
                          }),
                        },
                        {
                          target: "labels",
                          mutation: () => ({ active: true }),
                        },
                      ];
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: "data",
                          mutation: () => {},
                        },
                        {
                          target: "labels",
                          mutation: () => ({ active: false }),
                        },
                      ];
                    },
                  },
                },
              ]}
              // x={x}
              // y={y}
              // domain={ {x: [0, x.length + 1], y: [0, (Math.max(...y) + 20) ] } }
              barRatio={0.2}
              style={{
                data: {
                  fill: color,
                  width: 24,
                },
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            />
          </VictoryStack>
        </VictoryChart>
        </div>
      // </svg>
    );
  }
}
