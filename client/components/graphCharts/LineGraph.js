import { GolfCourseRounded } from '@material-ui/icons';
import React, { Component } from 'react';

import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryGroup,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
  VictoryVoronoi,
  VictoryVoronoiContainer,
  VictoryContainer,
  VictoryLegend,
} from 'victory';

export default class LineGraph extends Component {
  render() {
    const title = this.props.title || this.props.selectedDataset;
    const xTitle = this.props.xTitle || this.props.x;
    const yTitle = this.props.yTitle || this.props.y;
    const color = this.props.color || '#000000';
    const highlight = this.props.highlight || '#A9A9A9';
    const { formattedData } = this.props;

    let legendData = [];
    for (let item of formattedData) {
      legendData.push({ name: item.x });
    }

    return (
      <div id="graph">
        <div className="legendBox">
          <VictoryLegend
            title={xTitle}
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
              border: { stroke: 'black' },
              title: { fontSize: 16, color: 'black' },
            }}
            colorScale={[color]}
          />
        </div>
        <div>
          <VictoryChart
            theme={VictoryTheme.material}
            style={{
              parent: { maxWidth: '100%' },
            }}
            domainPadding={45}
            width={500}
            height={350}
            padding={{ left: 100, right: 25, top: 35, bottom: 75 }}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension="x"
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={0}
                    flyoutStyle={{ fill: 'white' }}
                  />
                }
              />
            }
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
              x={235}
              y={25}
            />
            <VictoryLabel
              text={xTitle}
              style={{
                fontSize: 16,
                textAnchor: 'start',
                verticalAnchor: 'end',
                fill: '#455A64',
                fontFamily: 'inherit',
              }}
              x={250}
              y={325}
            />
            <VictoryLabel
              text={yTitle}
              style={{
                fontSize: 16,
                textAnchor: 'start',
                verticalAnchor: 'end',
                fill: '#455A64',
                fontFamily: 'inherit',
              }}
              x={25}
              y={150}
            />
            <VictoryAxis
              fixLabelOverlap={true}
              style={{
                axis: { stroke: color },
                axisLabel: { fontSize: 12, padding: 60 },
                tickLabels: { angle: 30 },
              }}
              tickValues={formattedData.map((d) => d['x'])}
              tickFormat={formattedData.map((d) => {
                if (
                  this.props.x.toLowerCase().includes('month') ||
                  this.props.x.toLowerCase().includes('day')
                ) {
                  return d.x.slice(0, 3);
                } else {
                  return d.x;
                }
              })}
            />
            <VictoryAxis
              dependentAxis
              fixLabelOverlap={true}
              style={{
                axis: { stroke: '#756f6a' },
                axisLabel: { fontSize: 16, padding: 80 },
              }}
            />
            <VictoryLine
              data={formattedData.map((datum) => {
                let flyLabel = `${datum.x} : ${datum.y}`;
                datum.label = flyLabel;
                return datum;
              })}
              labelComponent={
                <VictoryTooltip
                  flyoutStyle={{ fill: 'white', stroke: 'grey' }}
                  cornerRadius={5}
                />
              }
              // labels={({ datum }) => datum.y}
              style={{ data: { stroke: color } }}
              alignment="middle"
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => ({
                            style: { stroke: highlight, strokeWidth: '3px' },
                          }),
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: true }),
                        },
                      ];
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => {},
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: false }),
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
          </VictoryChart>
        </div>
      </div>
    );
  }
}
