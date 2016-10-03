/**
 * image process helpers.
 */

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

export function matrixMultiplication(a, b) {
  return a.map(row => {
    return row.map((_, i) => {
      return row.reduce((sum, cell, j) => {
        return sum + cell * b[j][i]
      }, 0)
    })
  })
}
