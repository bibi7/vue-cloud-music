export function imgChche(src, callback) {
  const img = new Image();
  img.src = src
  img.onload = callback
}

export function toast(msg) {
  let toast = document.querySelector('#toast')
  toast.innerHTML = msg;
  document.querySelector("#toast").className = "toast";
  window.requestAnimationFrame(() => {
    document.querySelector("#toast").className = "toast show";
  });
}
