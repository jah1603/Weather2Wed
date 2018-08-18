document.addEventListener('DOMContentLoaded', ()=> {
const curvedSlider = function(){
  this.data = null;
}

const curve = {
  x: 0,
  y: 50,
  cpx: 250,
  cpy: 0,
  endx: 450,
  endy: 50
}
let percent = 0.1

let curveEl = document.getElementById('curve')
let thumbEl = document.getElementById('thumb')

// get the XY at the specified percentage along the curve
const getQuadraticBezierXYatPercent = (curve, percent) => {
  let x = Math.pow(1 - percent, 2) * curve.x + 2 * (1 - percent) * percent
    * curve.cpx + Math.pow(percent, 2) * curve.endx
  let y = Math.pow(1 - percent, 2) * curve.y + 2 * (1 - percent) * percent
    * curve.cpy + Math.pow(percent, 2) * curve.endy

  return { x, y }
}

const drawCurve = () => {
  curveEl.setAttribute(
    'd',
    `M${curve.x},${curve.y} Q${curve.cpx},${curve.cpy} ${curve.endx},${curve.endy}`
  )
}

const drawThumb = percent => {
	let pos = getQuadraticBezierXYatPercent(curve, percent)

  document.getElementById('value').textContent = 1534599694 + percent * (1566135694 - 1534599694)
  console.log(percent);
  thumbEl.setAttribute('cx', pos.x)
  thumbEl.setAttribute('cy', pos.y)
  console.log(thumbEl);
}

const moveThumb = e => {
  console.log(e.target.value)
  percent = (1566135694 - e.target.value) / (1566135694 - 1534599694)
  drawThumb(percent)
}

// event on the range input
let rangeEl = document.getElementById('range')
rangeEl.value = percent * 100
rangeEl.addEventListener('input', moveThumb)


// init
drawCurve()
drawThumb(percent)

})
