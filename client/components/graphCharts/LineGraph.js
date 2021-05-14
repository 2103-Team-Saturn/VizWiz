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
} from 'victory';

export default class LineGraph extends Component {
  render() {
    // console.log('**BG props', this.props);
    const { data, dataset, x, y } = this.props;
    // console.log('DATA', data);

    return (
      <div id="graph">
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
              labels={(data) => `${data.datum[x]}: ${data.datum[y]}`}
            />
          }
        >
          <VictoryLabel
            text={dataset}
            style={{
              fontSize: 20,
              textAnchor: 'start',
              verticalAnchor: 'end',
              fill: '#455A64',
              fontFamily: 'inherit',
            }}
            x={100}
            y={24}
          />
          <VictoryAxis
            label={x}
            fixLabelOverlap={true}
            style={{
              axis: { stroke: '#756f6a' },
              axisLabel: { fontSize: 16, padding: 60 },
              tickLabels: { angle: 20 },
            }}
          />
          <VictoryAxis
            dependentAxis
            label={y}
            style={{
              axis: { stroke: '#756f6a' },
              axisLabel: { fontSize: 16, padding: 80 },
            }}
            fixLabelOverlap={true}
          />
          <VictoryGroup>
            <VictoryLine
              data={data.map((d) => {
                // console.log('*d*>>>', d[y]);
                return d;
              })}
              x={x}
              y={y}
              style={{ data: { stroke: 'black' } }}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => ({
                            style: { stroke: 'red', strokeWidth: '3px' },
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
