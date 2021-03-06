// all utility functions used inside graphControl render:
import ReactDOM from 'react-dom';

export function dynamicVals(data, type, keys) {
  return keys.filter((key) => typeof data[0][key] === type);
}

export function formatForVictory(xVals, yVals) {
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
}

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

export async function download(title) {
  const svgHtml = document.querySelector('div.VictoryContainer > svg'); // once integrated with new navbar
  // 	const svgHtml = document.querySelector('svg');	// working original selector
  // const multiplePossible = document.querySelectorAll("svg");
  console.log('svgHtml>>>', svgHtml);

  const svgString = new XMLSerializer().serializeToString(svgHtml);
  // console.log('svgString>>>', svgString);
  const canvasElement = document.getElementById('canvas');
  let context = canvasElement.getContext('2d');
  const DOMURL = window.self.URL || window.self.webkitURL || window.self;

  let image = new Image();
  const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = DOMURL.createObjectURL(svg);
  image.src = url;

  image.onload = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(image, 0, 0);
    var png = canvas.toDataURL('image/png');
    document.querySelector('canvas').innerHTML = '<img src="' + png + '"/>';
    DOMURL.revokeObjectURL(png);

    const canvas2 = document.getElementById('canvas');
    let URL = canvas2.toDataURL('image/png');
    let link = document.createElement('a');
    link.href = URL;
    link.download = title ? title + '.png' : 'chart.png';

    document.body.appendChild(link);
    link.click();
  };
}

export async function saveImg(title, saveGraphCallback) {
  const svgHtml = document.querySelector('div.VictoryContainer > svg');

  var svgString = new XMLSerializer().serializeToString(svgHtml);

  const canvasElement = document.querySelector('canvas');
  let context = canvas.getContext('2d');
  var DOMURL = window.self.URL || window.self.webkitURL || window.self;

  let image = new Image();
  var svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });

  var url = DOMURL.createObjectURL(svg);
  image.src = url;

  const imageType = 'image/png';
  const imageData = canvasElement.toDataURL(imageType);

  image.onload = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(image, 0, 0);
    var png = canvas.toDataURL('image/png');
    document.querySelector('canvas').innerHTML = '<img src="' + png + '"/>';
    DOMURL.revokeObjectURL(png);

    const canvas2 = document.getElementById('canvas');
    let URL = canvas2.toDataURL('image/png');

    saveGraphCallback(URL);
  };
}
