/**
 * run image process background.
 * 图片坐标定义：原点位于左上角，宽为x轴，高为y轴
 */
import 'babel-polyfill'
import scale         from './scale'
import grayscale     from './grayscale'
import rotate        from './rotate'
import translate     from './translate'
import shear         from './shear'
import sharpen       from './sharpen'
import waveFiltering from './waveFiltering'
import noise         from './noise'
import morphology    from './morphology'

const op = {
  GRAYSCALE:     grayscale,
  SCALE:         scale,
  ROTATE:        rotate,
  TRANSLATE:     translate,
  SHEAR:         shear,
  SHARPEN:       sharpen,
  WAVEFILTERING: waveFiltering,
  NOISE:         noise,
  MORPHOLOGY:    morphology,
}
self.onmessage = ({ data: { opName, imageData, option } }) => {
  const result = op[opName](imageData, option)
  postMessage(result)
}
