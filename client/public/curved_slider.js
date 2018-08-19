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
let percentageAlongCurve = 0.45

let curveElement = document.getElementById('curve')
let thumbElement = document.getElementById('thumb')

// returns the X and Y coordinates at the stated percentage along curve
const getBezierQuadraticEquationXYCoordsAtPercent = (curve, percentageAlongCurve) => {
  let x = Math.pow(1 - percentageAlongCurve, 2) * curve.x + 2 * (1 - percentageAlongCurve) * percentageAlongCurve
    * curve.cpx + Math.pow(percentageAlongCurve, 2) * curve.endx
  let y = Math.pow(1 - percentageAlongCurve, 2) * curve.y + 2 * (1 - percentageAlongCurve) * percentageAlongCurve
    * curve.cpy + Math.pow(percentageAlongCurve, 2) * curve.endy

  return { x, y }
}

const drawCurve = () => {
  //sets attributes of SVG path element, where M means 'moveto' and Q denotes a quadratic Bézier equation
  curveElement.setAttribute(
    'd',
    `M${curve.x},${curve.y} Q${curve.cpx},${curve.cpy} ${curve.endx},${curve.endy}`
  )
}


const drawThumbUponInput = percentageAlongCurve => {

	let position = getBezierQuadraticEquationXYCoordsAtPercent(curve, percentageAlongCurve)

  const seconds = 1514818906 + percentageAlongCurve * 31536000;
  const dateToDisplay = new Date(seconds * 1000);
   var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
   var month = months[dateToDisplay.getMonth()];
   var date = dateToDisplay.getDate();

   console.log(dateToDisplay);

   const formattedDate = date + ' ' + month;

  document.getElementById('value').textContent = formattedDate;

  document.getElementById('value').style.webkitAnimationPlayState = "paused";
  document.getElementById('value').style.animationPlayState = "paused";

  thumbElement.setAttribute('cx', position.x)
  thumbElement.setAttribute('cy', position.y)
  console.log(thumbElement);
}



const drawThumb = percentageAlongCurve => {

	let position = getBezierQuadraticEquationXYCoordsAtPercent(curve, percentageAlongCurve)

  const seconds = 1514818906 + percentageAlongCurve * 31536000;
  const dateToDisplay = new Date(seconds * 1000);
   var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
   var month = months[dateToDisplay.getMonth()];
   var date = dateToDisplay.getDate();

   console.log(dateToDisplay);

   const formattedDate = date + ' ' + month;

  document.getElementById('value').textContent = "Slide ring to set a date";

  thumbElement.setAttribute('cx', position.x)
  thumbElement.setAttribute('cy', position.y)
  console.log(thumbElement);
}

const moveThumb = e => {
  console.log(e.target.value)
  percentageAlongCurve = e.target.value / 31536000
  drawThumbUponInput(percentageAlongCurve)
}

// event on the range input
let rangeElement = document.getElementById('range')
rangeElement.value = percentageAlongCurve * 100
rangeElement.addEventListener('input', moveThumb)


// init
drawCurve()
drawThumb(percentageAlongCurve)

})
