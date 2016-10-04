/**
 * run image process background.
 */
import 'babel-polyfill';

import scale from './scale'
import grayscale from './grayscale'
import rotate from './rotate'
import { PROCESSES } from './processName'

const { GRAYSCALE, SCALE } = PROCESSES
const op = {
  GRAYSCALE: grayscale,
  SCALE: scale,
  ROTATE: rotate,
}
onmessage = ({ data: { opName, imageData, option } }) => {
  const result = op[opName](imageData, option)
  postMessage(result)
}