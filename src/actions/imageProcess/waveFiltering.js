/**
 * 频率域滤波
 */
import { getPixelPosition, getCoordinate } from './util'
import FFT                                 from './FFT/myFFT'
import SpectrumViewer                      from './FFT/Spectrum'
import FrequencyFilter                     from './FFT/filter'
import grayscale                           from './grayscale'

function getData(data, coor, width, height) {
  return (x, y, offset = 0) => {
    if (x >= 0 && y >= 0 && x < width && y < height) {
      return data[coor(x, y) + offset]
    }
    return 0
  }
}

function grayscaleAndGaussianFilter(data, width, height) {
  const dData = new Uint8ClampedArray(width * height)
  const grayData = grayscale({ data, width, height }, { type: 'WEIGHTED_AVERAGE' }).data
  const coor = getCoordinate(width)
  const position = getPixelPosition(width, height)
  const gaussianPosition = getPixelPosition(5, 5, 1)
  const gaussianMatrix = [2, 4, 5, 4, 2,
                          4, 9, 12, 9, 4,
                          5, 12, 15, 12, 5,
                          4, 9, 12, 9, 4,
                          2, 4, 5, 4, 2]
  const autoData = getData(grayData, coor, width, height)
  let dIndex = 0
  for (const [x, y] of position()) {
    let mask = 0
    for (const [gx, gy, index] of gaussianPosition()) {
      mask += autoData(x - 2 + gx, y - 2 + gy) * gaussianMatrix[index]
    }
    dData[dIndex] = mask / 115
    dIndex += 1
  }
  return dData
}
export default function waveFiltering(imageData, { type = 'ROBERTS', d: radius = 20 } = {}) {
  const { width, height, data } = imageData
  // 原始图像的data下标
  FFT.init(width)
  FrequencyFilter.init(width)
  let re = []
  const im = []
  let i = 0
  for (let y = 0; y < height; y++) {
    i = y * width
    for (let x = 0; x < width; x++) {
      re[i + x] = data[(i << 2) + (x << 2)]
      im[i + x] = 0.0
    }
  }
  const dData = new Uint8ClampedArray(4 * width * height)
  // 分成实部 和 虚部处理
  FFT.fft2d(re, im)
  SpectrumViewer.init(dData, width)
  FrequencyFilter.swap(re, im)
  switch (type) {
    case 'LOW_PASS_FILTER':
      FrequencyFilter.LPF(re, im, radius)
      break
    case 'HIGH_PASS_FILTER':
      FrequencyFilter.HPF(re, im, radius)
      break
    case 'GAUSS_LOW_PASS_FILTER':
      FrequencyFilter.GLPF(re, im, radius)
      break
    case 'GAUSS_HIGH_PASS_FILTER':
      FrequencyFilter.GHPF(re, im, radius)
      break
    case 'BUTTER_WORTH_LOW_PASS_FILTER':
      FrequencyFilter.BWLPF(re, im, radius)
      break
    default:
  }
  FrequencyFilter.swap(re, im)
  //SpectrumViewer.draw(re, im, true)
  FFT.ifft2d(re, im)
  switch (type) {
    case 'GAUSS_FILTER':
      re = grayscaleAndGaussianFilter(data, width, height)
      break
    default:
  }
  const dCoor = getCoordinate(width, 1)
  const dPos = getPixelPosition(width, height)
  for (const [x, y, index] of dPos()) {
    const val = re[dCoor(x, y)]
    dData[index] = val
    dData[index + 1] = val
    dData[index + 2] = val
    dData[index + 3] = 255
  }
  // // 原始图像的坐标
  return {
    width,
    height,
    data: dData,
  }
}
