/**
 * run image process background.
 */
import 'babel-polyfill';

import scale         from './scale'
import grayscale     from './grayscale'
import rotate        from './rotate'
import translate     from './translate'
import shear from './shear'
import { PROCESSES } from './processName'

const { GRAYSCALE, SCALE, ROTATE, TRANSLATE, SHEAR } = PROCESSES
const op = {
  GRAYSCALE: grayscale,
  SCALE: scale,
  ROTATE: rotate,
  TRANSLATE: translate,
  SHEAR: shear,
}
onmessage = ({ data: { opName, imageData, option } }) => {
  const result = op[opName](imageData, option)
  postMessage(result)
}
