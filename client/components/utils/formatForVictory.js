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