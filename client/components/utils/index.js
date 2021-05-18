// all utility functions used inside graphControl render:
import ReactDOM from "react-dom"

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

	if (typeof xValues[0] === "string") {
		if (x.toLowerCase().includes("date")) {
			suggestions = ["bar", "line"];
		} else suggestions = ["bar", "pie", "line"];
	}
	if (typeof xValues[0] === "number") {
		if (xValues.length >= 10) suggestions = ["scatter", "line"];
	}
	return suggestions;
}

export function download () {
	var svgElement = ReactDOM.findDOMNode(this).querySelector('svg')
	let {width, height} = svgElement.getBBox();
	let clonedSvgElement = svgElement.cloneNode(true);
	let outerHTML = clonedSvgElement.outerHTML,
	blob = new Blob([outerHTML],{type:'image/svg+xml;charset=utf-8'});
	let URL = window.URL || window.webkitURL || window;
	let blobURL = URL.createObjectURL(blob);

	let image = new Image();
	image.onload = () => {

   let canvas = document.createElement('canvas');

   canvas.width = width;

   canvas.height = height;
   let context = canvas.getContext('2d');
   // draw image in canvas starting left-0 , top - 0
   context.drawImage(image, 0, 0, width, height );
  //  downloadImage(canvas); need to implement
	};
	image.src = blobURL;

	let png = canvas.toDataURL(); // default png
	let jpeg = canvas.toDataURL('image/jpg');
	let webp = canvas.toDataURL('image/webp');
}
