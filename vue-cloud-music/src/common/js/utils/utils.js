export function imgChche(src, callback) {
  const img = new Image();
  img.onload = callback
  img.src = src
}
