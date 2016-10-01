export const supportTypes = {
  AVERAGE:          'AVERAGE',
  WEIGHTED_AVERAGE: 'WEIGHTED_AVERAGE',
  MIN:              'MIN',
  MAX:              'MAX',
}

function average(r, g, b) {
  return (r + g + b) / 3
}
function weightAgerage(r, g, b) {
  return (r * 0.299 + g * 0.587 + b * 0.144)
}
function min(r, g, b) {
  return (Math.min(r, g, b))
}
function max(r, g, b) {
  return (Math.max(r, g, b))
}
export function grayscale(imageData, { type = supportTypes.AVERAGE } = {}) {
  let data = imageData.data
  let grayFunction = average
  switch (type) {
    case supportTypes.WEIGHTED_AVERAGE:
      console.log('WEIGHTED_AVERAGE');
      grayFunction = weightAgerage
      break;
    case supportTypes.MIN:
    console.log("min");
      grayFunction = min
      break;
    case supportTypes.MAX:
    console.log("max");
      grayFunction = max
      break;
    default:
      console.log('AVERAGE');
      grayFunction = average

  }
  for (var i = 0; i < data.length; i += 4) {
    var val = grayFunction(data[i], data[i +1], data[i +2])
    data[i]     = val; // red
    data[i + 1] = val; // green
    data[i + 2] = val; // blue
  }
   return imageData
}
