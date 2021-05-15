import React, { Component } from 'react';

import {
  VictoryScatter,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryGroup,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
  VictoryVoronoiContainer,
} from 'victory';

export default class ScatterChart extends Component {
  render() {
    console.log('**SG props', this.props);
    // const { data, dataset, x, y } = this.props;
    // console.log('DATA', x);
    const title = this.props.title || this.props.selectedDataset;
    const xTitle = this.props.xTitle || this.props.x;
    const yTitle = this.props.yTitle || this.props.y;
    const color = this.props.color || '#000000';
    const highlight = this.props.highlight || '#A9A9A9';
    const { formattedData } = this.props;
    console.log('formattedData inside BG>>>', formattedData);

    return (
      <div id="graph">
        <VictoryChart
          theme={VictoryTheme.material}
          style={{ parent: { maxWidth: '100%' } }}
          domainPadding={45}
          width={500}
          height={350}
          padding={{ left: 100, right: 25, top: 35, bottom: 75 }}
          // containerComponent={
          //   <VictoryVoronoiContainer
          //     labels={(data) =>
          //       `${x}: ${data.datum[x]}, ${y}: ${data.datum[y]}`
          //     }
          //   />
          // }
        >
          <VictoryLabel
            text={title}
            style={{
              fontSize: 20,
              textAnchor: 'start',
              verticalAnchor: 'end',
              fill: '#455A64',
              fontFamily: 'inherit',
            }}
            x={250}
            y={25}
          />
          <VictoryAxis
            label={xTitle}
            style={{
              axis: { stroke: '#756f6a' },
              axisLabel: { fontSize: 16, padding: 60 },
              tickLabels: { angle: 20 },
            }}
            fixLabelOverlap={true}
          />
          <VictoryAxis
            dependentAxis
            label={yTitle}
            style={{
              axis: { stroke: '#756f6a' },
              axisLabel: { fontSize: 16, padding: 80 },
            }}
            fixLabelOverlap={true}
          />
          <VictoryGroup>
            <VictoryScatter
              data={formattedData}
              // data={data.map((d) => {
              //   console.log('*d*>>>', d);
              //   return d;
              // })}
              // x={x}
              // y={y}
              style={{ data: { fill: color } }}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => ({
                            style: {
                              fill: highlight,
                              strokeWidth: '10px',
                            },
                          }),
                        },
                      ];
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => {},
                        },
                      ];
                    },
                  },
                },
              ]}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
    );
  }
}
