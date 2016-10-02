/**
 * image process helpers.
 */

// deep copy an ImageData object
const ctx = document.createElement('canvas').getContext('2d')
export function copyImageData(src, width = src.width, height = src.height, data = src.data) {
  const dst = ctx.createImageData(width, height);
  dst.data.set(data);
  return dst;
}

// return coordinate in imageData.data according to position x, y
export function getCoordinate(width) {
  return (x, y) => x * 4 + y * width * 4
}

// return a generator iterates all pixel position
export function getPixelPosition(width, height) {
  const positions = function* pos() {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        yield [x, y, x * 4 + y * width * 4]
      }
    }
  }
  positions[Symbol.iterator] = positions
  return positions
}