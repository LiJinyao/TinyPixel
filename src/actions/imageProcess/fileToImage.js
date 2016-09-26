export function fileToImage(file) {
  const image = new Image()
  image.src = URL.createObjectURL(file)
  return image
}
