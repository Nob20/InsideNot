export function getImageURLWithTransformations (originalURL, transformation) {
  let splitted = originalURL.split('/')
  const indexOfUpload = splitted.indexOf('upload')
  splitted.splice(indexOfUpload + 1, 0, transformation)
  const newURLWithTransformation = splitted.join('/')
  return newURLWithTransformation
}
