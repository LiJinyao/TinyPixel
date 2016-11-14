import { getPixelPosition, getCoordinate } from './util'
import grayscale                           from './grayscale'
/*eslint-disable*/
const steps = [
  [0, 0],
  [-1, 0], [1, 0], [0, -1], [0, 1],
  [-1, -1], [1, 1], [-1, 1], [1, -1],
]

function getData(data, coor, width, height) {
  return (x, y, offset = 0) => {
    if (x >= 0 && y >= 0 && x < width && y < height) {
      return data[coor(x, y) + offset]
    }
    return 175
  }
}
function saltAndPepperNoise(d, width, height) {
  const data = d
  const coor = getCoordinate(width)
  const pixels = Math.round((data.length / 4) * ((0.1 * Math.random()) + 0.05))
  for (let i = 0; i < pixels / 2; ++i) {
    const index = coor(Math.round(width * Math.random()), Math.round(height * Math.random()))
    data[index] = 0
    data[index + 1] = 0
    data[index + 2] = 0
  }
  for (let i = 0; i < pixels / 2; ++i) {
    const index = coor(Math.round(width * Math.random()), Math.round(height * Math.random()))
    data[index] = 255
    data[index + 1] = 255
    data[index + 2] = 255
  }
  return data
}
function randomNormalDistribution() {
  let u = 0.0
  let v = 0.0
  let w = 0.0
  let c = 0.0
  do {
    u = (Math.random() * 2) - 1.0
    v = (Math.random() * 2) - 1.0
    w = (u * u) + (v * v)
  } while (w == 0.0 || w >= 1.0)
  c = Math.sqrt((-2 * Math.log(w)) / w)
  return u * c
}
// mean: 均值
// dev: 标准差
function getNumberInNormalDistribution(mean, dev) {
  return mean + (randomNormalDistribution() * dev)
}
function gaussNoise(d, width, height) {
  const data = d
  const posotion = getPixelPosition(width, height)
  for (const [, , index] of posotion()) {
    data[index] += getNumberInNormalDistribution(0, 30)
    data[index + 1] += getNumberInNormalDistribution(0, 30)
    data[index + 2] += getNumberInNormalDistribution(0, 30)
  }
  return data
}

function arithmeticMeanFilter(d, width, height) {
  const data = d
  const dData = new Uint8ClampedArray(4 * width * height)
  const posotion = getPixelPosition(width, height)
  const coor = getCoordinate(width)
  const autoData = getData(data, coor, width, height)
  for (const [x, y, index] of posotion()) {
    for (let j = 0; j < 3; ++j) {
      let sum = 0
      for (let i = 0; i < 9; ++i) {
        const step = steps[i]
        sum += autoData(x + step[0], y + step[1], j)
      }
      dData[index + j] = sum / 9
    }
    dData[index + 3] = 255
  }
  return dData
}

function geometricMeanFilter(d, width, height) {
  const data = d
  const dData = new Uint8ClampedArray(4 * width * height)
  const posotion = getPixelPosition(width, height)
  const coor = getCoordinate(width)
  const autoData = getData(data, coor, width, height)
  for (const [x, y, index] of posotion()) {
    for (let j = 0; j < 3; ++j) {
      let mult = 1
      for (let i = 0; i < 9; ++i) {
        const step = steps[i]
        mult *= autoData(x + step[0], y + step[1], j)
      }
      dData[index + j] = Math.pow(mult, 1 / 9)
    }
    dData[index + 3] = 255
  }
  return dData
}

function harmonischeMeanFilter(data, width, height) {
  const dData = new Uint8ClampedArray(4 * width * height)
  const posotion = getPixelPosition(width, height)
  const coor = getCoordinate(width)
  const autoData = getData(data, coor, width, height)
  for (const [x, y, index] of posotion()) {
    for (let j = 0; j < 3; ++j) {
      let sum = 0
      for (let i = 0; i < 9; ++i) {
        const step = steps[i]
        sum += 1 / autoData(x + step[0], y + step[1], j)
      }
      dData[index + j] = 9 / sum
    }
    dData[index + 3] = 255
  }
  return dData
}

function antiHarmonischeMeanFilter(data, width, height, Q) {
  const dData = new Uint8ClampedArray(4 * width * height)
  const posotion = getPixelPosition(width, height)
  const coor = getCoordinate(width)
  const autoData = getData(data, coor, width, height)
  for (const [x, y, index] of posotion()) {
    for (let j = 0; j < 3; ++j) {
      let sum1 = 0
      let sum2 = 0
      for (let i = 0; i < 9; ++i) {
        const step = steps[i]
        sum1 += Math.pow(autoData(x + step[0], y + step[1], j), Q + 1)
        sum2 += Math.pow(autoData(x + step[0], y + step[1], j), Q)
      }
      dData[index + j] = sum1 / sum2
    }
    dData[index + 3] = 255
  }
  return dData
}

export default function noise(imageData, { type = 'GAUSS_NOISE' } = {}) {
  const { data, width, height } = imageData
  let dData
  // const coor = getCoordinate(width)
  // const pixels = Math.round((data.length / 4) * ((0.2 * Math.random()) + 0.2))
  // for (let i = 0; i < pixels; ++i) {
  //   const index = coor(Math.round(width * Math.random()), Math.round(height * Math.random()))
  //   data[index] = 0
  //   data[index + 1] = 0
  //   data[index + 2] = 0
  // }

  switch (type) {
    case 'GAUSS_NOISE':
      dData = gaussNoise(data, width, height)
      break
    case 'SALT_AND_PEPPER_NOISE':
      dData = saltAndPepperNoise(data, width, height)
      break
    case 'ARITHMETIC_MEAN_FILTER':
      dData = arithmeticMeanFilter(data, width, height)
      break
    case 'GEOMETRIC_MEAN_FILTER':
      dData = geometricMeanFilter(data, width, height)
      break
    case 'HARMONISCHE_MEAN_FILTER':
      dData = harmonischeMeanFilter(data, width, height)
      break
    case 'ANTI_HARMONISCHE_MEAN_FILTER':
      dData = antiHarmonischeMeanFilter(data, width, height, 1.5)
      break
    default:
  }
  const grayData = grayscale({ data: dData, width, height }, { type: 'WEIGHTED_AVERAGE' }).data
  return {
    data: grayData,
    width,
    height,
  }
}
