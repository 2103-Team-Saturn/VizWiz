import React, { Component } from "react";

import {
  VictoryPie,
  VictoryTooltip,
  VictoryContainer,
  VictoryLegend,
  VictoryChart,
  VictoryAxis,
} from "victory";

export default class PieGraph extends Component {
  render() {
    const title = this.props.title || this.props.selectedDataset;
    const { formattedData } = this.props;
    const pieColor = this.props.pieColor || "grayscale";
    const highlight = this.props.highlight || "black";
    const { checkedDonut, checkedHalf, checkedPadding } = this.props;

    //create tooltip labels
    for (let d of formattedData) {
      d.label = `${d.x}: ${d.y}`;
    }

    let legendData = [];
    for (let item of formattedData) {
      legendData.push({ name: item.x });
    }
    console.log("LD**>>>", legendData);
    let donut, slicePadding, start, end;

    if (checkedDonut) {
      donut = 0;
    } else donut = 85;

    if (checkedHalf) {
      start = 90;
      end = 450;
    } else {
      start = -90;
      end = 90;
    }

    if (checkedPadding) {
      slicePadding = 0;
    } else {
      slicePadding = 5;
    }

    return (
      <div id="graph">
        <VictoryChart
          style={{ parent: { maxWidth: "100%" } }}
          domainPadding={60}
          width={600}
          height={400}
          padding={{ left: 100, right: 25, top: 35, bottom: 75 }}
        >
          <VictoryPie
            style={{
              parent: {
                maxWidth: "100%",
              },
              labels: {
                fontSize: 16,
                fill: "black",
              },
            }}
            containerComponent={<VictoryContainer responsive={false} />}
            labelComponent={
              <VictoryTooltip flyoutStyle={{ fill: "white", stroke: "grey" }} />
            }
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "data",
                        mutation: () => ({
                          style: { fill: highlight },
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
            domainPadding={45}
            width={500}
            height={350}
            data={formattedData}
            colorScale={pieColor}
            innerRadius={donut}
            padAngle={slicePadding}
            startAngle={start}
            endAngle={end}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
          <VictoryLegend
            title={title}
            centerTitle
            titleOrientation="left"
            containerComponent={<VictoryContainer responsive={false} />}
            data={legendData}
            orientation="horizontal"
            gutter={20}
            itemsPerRow={3}
            x={5}
            y={15}
            width="100%"
            height="100%"
            style={{
              border: { stroke: "black" },
              title: { fontSize: 16, color: "black" },
              zIndex: 2,
            }}
            colorScale={pieColor}
          />
          <VictoryAxis
            style={{
              axis: { stroke: "none" },
            }}
            tickFormat={() => ""}
          />
        </VictoryChart>
      </div>
    );
  }
}
