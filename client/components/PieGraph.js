import React, { Component } from "react";
import { formatData } from "../store/singleData";
import { connect } from 'react-redux';
import {
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
  VictoryLegend,
  VictoryChart,
  VictoryAxis,
} from "victory";

export class PieGraph extends Component {

componentDidMount () {
  this.props.formatForPie(this.props.data);
}

  render() {
    console.log("**PG props", this.props);

    const { data, dataset, x, y } = this.props;
    console.log('PG data>>>', data);
    console.log('x>>>', x);
    console.log('y>>>', y);

    // let xForPie, yForPie;
    // if(x) {
    //   xForPie = data.map( (d) => d[x]);
    // }
    // if(y) {
    //   yForPie = data.map( (d) => d[y]);
    // }
    // console.log('forPie>>>', xForPie, yForPie);

    // const reformatForPie = (x, y) => {
    //   let result = [];
    //   for(let i=0; i<x.length; i++) {
    //     result.push( { x: x, y: y} );
    //   }
    //   return result;
    // }
    // let dataForPie = [];
    // if(x) {
    // dataForPie = reformatForPie(xForPie, yForPie);
    // }

    return (
      <div id="graph">
        <VictoryLabel
          text={dataset}
          style={{
            fontSize: 20,
            textAnchor: "start",
            verticalAnchor: "end",
            fill: "#455A64",
            fontFamily: "inherit",
          }}
        />
        <VictoryPie
          style={{
            parent: {
              maxWidth: "100%",
            },
            labels: {
              fontSize: 16,
              fill: "white",
            },
          }}
          domainPadding={45}
          width={500}
          height={350}
          data={data}
          colorScale={["#E60000", "72A0C1", "3B7A57", "FFFF66", "FF8095"]}
          innerRadius={85}
          padAngle={5}
          // startAngle={-90}
          // endAngle={90}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  formatted: state.singleData.formatted,
})

const mapDispatch = (dispatch) => {
  return {
    formatForPie: (data) => dispatch(formatData(data)),
  }
}

export default connect(null, mapDispatch)(PieGraph);
