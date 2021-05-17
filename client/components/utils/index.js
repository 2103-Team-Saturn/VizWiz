// all utility functions used inside graphControl render:
export function dynamicVals(data, type) {
    return keys.filter((key) => typeof data[0][key] === type);
};

export function formatForVictory (xVals, yVals) {
    const result = [];
    let i = 0;
    while (i < Math.max(xVals.length, yVals.length)) {
      if (xVals[i] && yVals[i]) {
        // if not null or undefined
        result.push({ x: xVals[i], y: yVals[i] });
        i++;
      } else {
        i++;
        continue;
      }
    }
    return result;
  };

  export function graphSuggestor(xValues, yValues, x) {
    let suggestions = [];
  
    if (typeof xValues[0] === 'string') {
      if (x.toLowerCase().includes('date')) {
        suggestions = ['bar', 'line'];
      } else suggestions = ['bar', 'pie', 'line'];
    }
    if (typeof xValues[0] === 'number') {
      if (xValues.length >= 10) suggestions = ['scatter', 'line'];
    }
  
    return suggestions;
  }

  export function dataCleanup(data, axisKey)    {
    return data.map((dataObj) => {
        if (dataObj[this.state[axisKey]]) {
            return dataObj[this.state[axisKey]];
        } else return null;
    });
  }