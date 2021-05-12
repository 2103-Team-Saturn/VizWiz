import React, { Component } from 'react';
import { formatData } from '../../store/singleData';
import { connect } from 'react-redux';
import {
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
  VictoryLegend,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
} from 'victory';

export default class PieGraph extends Component {
  render() {
    console.log('**PG props', this.props);

    const { data, dataset, x, y } = this.props;
    console.log('PG data>>>', data);
    console.log('x>>>', x);
    console.log('y>>>', y);

    return (
      <div id="graph">
        <VictoryLabel
          text={dataset}
          animate={{
            duration: 2000,
            easing: 'exp',
          }}
          style={{
            fontSize: 20,
            textAnchor: 'start',
            verticalAnchor: 'end',
            fill: '#455A64',
            fontFamily: 'inherit',
          }}
        />

        <VictoryStack>
          <VictoryPie
            style={{
              parent: {
                maxWidth: '100%',
              },
              labels: {
                fontSize: 16,
                fill: 'black',
              },
            }}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: 'white', stroke: 'lightgrey' }}
              />
            }
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: 'data',
                        mutation: () => ({
                          style: { fill: 'lightgrey' },
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
            domainPadding={45}
            width={500}
            height={350}
            data={data}
            x={x}
            y={y}
            colorScale={'cool'}
            innerRadius={85}
            padAngle={5}
            // startAngle={-90}
            // endAngle={90}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
        </VictoryStack>
      </div>
    );
  }
}
