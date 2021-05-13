export function graphSuggestor(xValues, yValues, x) {
  let suggestions = [];

  //x is the key (header)
  //xValues is the key-value

  if (typeof xValues[0] === 'string') {
    if (x.toLowerCase().includes('date')) {
      suggestions = ['bar', 'line'];
    } else suggestions = ['bar', 'pie', 'line'];
    //mostly hitting this first if statement, because we don't have number xValue type inside x axis selector
  }
  if (typeof xValues[0] === 'number') {
    if (xValues.length >= 10) suggestions = ['scatter'];
    else suggestions = ['bar'];
  }

  return suggestions;
}
