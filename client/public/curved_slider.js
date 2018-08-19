document.addEventListener('DOMContentLoaded', ()=> {
const curvedSlider = function(){
  this.data = null;
}


// Defines the parameters of the quadratic curve along which the selector ring will travel
const curve = {
  x: 0,
  y: 50,
  cpx: 250,
  cpy: 0,
  endx: 450,
  endy: 50
}
let percentageAlongCurve = 0.45 // point on curve where the selector ring sits initially

let curveElement = document.querySelector('#curve')
let ringElement = document.querySelector('#ring')

// Returns the X and Y coordinates at the stated percentage along curve
const getBezierQuadraticEquationXYCoordsAtPercent = (curve, percentageAlongCurve) => {
  let x = Math.pow(1 - percentageAlongCurve, 2) * curve.x + 2 * (1 - percentageAlongCurve) * percentageAlongCurve
    * curve.cpx + Math.pow(percentageAlongCurve, 2) * curve.endx
  let y = Math.pow(1 - percentageAlongCurve, 2) * curve.y + 2 * (1 - percentageAlongCurve) * percentageAlongCurve
    * curve.cpy + Math.pow(percentageAlongCurve, 2) * curve.endy

  return { x, y }
}

const plotQuadraticCurve = () => {
  //Sets attributes of SVG path element, where M means 'moveto' and Q denotes a quadratic Bézier equation
  curveElement.setAttribute(
    'd',
    `M${curve.x},${curve.y} Q${curve.cpx},${curve.cpy} ${curve.endx},${curve.endy}`
  )
}

// Automatically moves the selector ring in response to user input
const updateSelectorRingPositionUponInput = percentageAlongCurve => {

	let position = getBezierQuadraticEquationXYCoordsAtPercent(curve, percentageAlongCurve)

// Mapping the value of the range input to the dates in one year based on the Julian calendar, using UNIX time

  const seconds = 1514818906 + percentageAlongCurve * 31536000;
  const dateToDisplay = new Date(seconds * 1000);
   var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
   var month = months[dateToDisplay.getMonth()];
   var date = dateToDisplay.getDate();

   console.log(dateToDisplay);

   const formattedDate = date + ' ' + month;

  document.querySelector('#value').textContent = formattedDate;

  document.querySelector('#value').style.webkitAnimationPlayState = "paused";
  document.querySelector('#value').style.animationPlayState = "paused";

  ringElement.setAttribute('cx', position.x)
  ringElement.setAttribute('cy', position.y)
  console.log(ringElement);
}


// Defines the default (i.e. starting) position of the selector ring and displays an explanatory prompt to the user telling them how to set the date
const initialSelectorRingPosition = percentageAlongCurve => {

	const position = getBezierQuadraticEquationXYCoordsAtPercent(curve, percentageAlongCurve)

  document.querySelector('#value').textContent = "Slide ring to set a date";

  ringElement.setAttribute('cx', position.x) //Sets selector ring X position
  ringElement.setAttribute('cy', position.y) //Sets selector ring Y position
  console.log(ringElement);
}

const moveThumb = e => {
  console.log(e.target.value)
  percentageAlongCurve = e.target.value / 31536000
  updateSelectorRingPositionUponInput(percentageAlongCurve)
}

// event on the range input
const rangeElement = document.querySelector('#range')
rangeElement.value = percentageAlongCurve * 100
rangeElement.addEventListener('input', moveThumb)


// Initializes the curve and selector ring, the latter being updated constantly in response to user input
plotQuadraticCurve()
initialSelectorRingPosition(percentageAlongCurve)

})
