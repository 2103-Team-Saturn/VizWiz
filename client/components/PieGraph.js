import React from "react";
import { VictoryChart, VictoryStack, VictoryPie } from "victory";

const taxData = {
  name: "IDA 2019 Tax Expenses - IDA.csv",
  data: [
    {
      "Dates (2019)": "2/8 - 2/11",
      Competition: "Diva",
      Uber: 27.17,
      Lyft: 19.0,
      "Meal Expenses": 46.17,
      Misc: 992.5,
      "Per Diem?": 4.65,
    },
    {
      "Dates (2019)": "3/8 - 3/10",
      Competition: "Inferno (NC)",
      Uber: 26.49,
      Lyft: 57.54,
      "Meal Expenses": 11.28,
      Misc: 95.31,
      "Per Diem?": 320.0,
      Totals: 29.78,
    },
    {
      "Dates (2019)": "3/15 - 3/17",
      Competition: "Epic",
      Uber: 25.16,
      Lyft: 25.16,
      "Meal Expenses": 1042.0,
      Misc: 2.41,
    },
    {
      "Dates (2019)": "3/22 - 3/24",
      Competition: "Inferno (LI)",
      Uber: 42.48,
      Lyft: 9.78,
      "Meal Expenses": 52.26,
      Misc: 830.0,
      "Per Diem?": 6.3,
    },
    {
      "Dates (2019)": "3/29 - 3/31",
      Competition: "Axis",
      Uber: 14.44,
      Lyft: 12.58,
      "Meal Expenses": 56.76,
      Misc: 17.85,
      "Per Diem?": 50.0,
      Totals: 101.63,
    },
    {
      "Dates (2019)": "4/5 - 4/7",
      Competition: "SDA",
      Uber: 29.03,
      Lyft: 159.0,
      "Meal Expenses": 188.03,
      Misc: 188.03,
      "Per Diem?": 681.25,
      Totals: 27.6,
    },
    {
      "Dates (2019)": "4/12 - 4/13",
      Competition: "Inferno (AL)",
      Uber: 29.97,
      Lyft: 131.3,
      "Meal Expenses": 161.27,
      Misc: 270.0,
      "Per Diem?": 59.73,
    },
    {
      "Dates (2019)": "4/26 - 4/28",
      Competition: "Inferno (MKE)",
      Uber: 27.63,
      Lyft: 90.0,
      "Meal Expenses": 116.11,
      Misc: 233.74,
      "Per Diem?": 365.0,
      Totals: 64.04,
    },
    {
      "Dates (2019)": "5/3 - 5/5",
      Competition: "Inferno (LI)",
      Uber: 4.72,
      Lyft: 88.66,
      "Meal Expenses": 12.0,
    },
    {
      "Dates (2019)": "7/7 - 7/12",
      Competition: "Inferno (ORL) *Nationals",
      Uber: 36.29,
      Lyft: 152.38,
      "Meal Expenses": 200.0,
      Misc: 188.67,
      "Per Diem?": 11.33,
      Totals: 1040.0,
    },
    {
      "Dates (2019)": "7/15 - 7/18",
      Competition: "Fierce Nationals",
      Uber: 33.78,
      Lyft: 85.0,
      "Meal Expenses": 569.03,
      Misc: 602.31,
    },
    {
      "Dates (2019)": "7/21 - 7/26",
      Competition: "Inferno (NJ) *Nationals",
      Uber: 125.0,
      Lyft: 31.5,
      "Meal Expenses": 231.5,
      Misc: 156.5,
      "Per Diem?": 106.5,
      Totals: 1490.0,
    },
  ],
  view: "upload",
};

class PieGraph extends React.Component {
  constructor() {
    super();
    //changes for customizing graph
    this.state = {
      graph: "",
      x: "",
      y: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  // get data eventually from thunk, for now dummy^

  render() {
    let data = taxData.data;

    let keys = Object.keys(data[0]); // -> array of possible graph properties [Dates, Competition, Uber, Lyft, Meal Expenses, Misc, Per Diem, Total]
    console.log("data>>>", data);
    console.log("keys>>>", keys);

    // x axis tends to be strings, in line/scatter, but x can also be numbers,
    // y axis needs to be numbers, **pie charts don't operate on axis
    const dynamicVals = (data, type) => {
      return Object.keys(data[0]).filter((key) => typeof data[0][key] === type);
    };

    let xPossibilities = dynamicVals(data, "string"); // -> put xPossibilities on ln 191 to be mapped?
    console.log("X>>>", xPossibilities);
    let yPossibilities = dynamicVals(data, "number");
    console.log("Y>>>", yPossibilities);

    const { handleChange } = this;

    return (
      <div>
        <div>
          <select name="graph" onChange={handleChange} value={this.state.graph}>
            <option value="" disabled selected>
              Graph Type
            </option>
            <option value="Bar">Bar</option>
            <option value="Pie">Pie</option>
            <option value="Line">Line</option>
            <option value="Scatter">Scatter</option>
          </select>
        </div>
        <div>
          <select name="x" onChange={handleChange} value={this.state.x}>
            <option value="" disabled selected>
              X axis
            </option>
            {xPossibilities.map((key, idx) => (
              <option key={idx} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select name="y" onChange={handleChange} value={this.state.y}>
            <option value="" disabled selected>
              Y axis
            </option>
            {yPossibilities.map((key, idx) => (
              <option key={idx} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <VictoryChart domainPadding={10} scale={{ x: "linear", y: "linear" }}>
          <VictoryStack colorScale={"warm"}>
            <VictoryPie
              data={taxData.data}
              // x={this.state.x}
              // y={this.state.y}
            />
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}

export default PieGraph;
