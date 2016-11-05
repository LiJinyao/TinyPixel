/**
 * 频率域滤波
 */
import { getPixelPosition, getCoordinate } from './util'

export default function waveFiltering(imageData, { type = 'ROBERTS' } = {}) {
  const { width, height, data } = imageData
  // 原始图像的data下标
  const oCoor = getCoordinate(width)
  // // 原始图像的坐标
  return {
    width,
    height,
    data,
  }
}
