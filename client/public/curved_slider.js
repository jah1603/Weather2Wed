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
let percent = 0.45

let curveElement = document.getElementById('curve')
let thumbElement = document.getElementById('thumb')

// returns the X and Y coordinates at the stated percentage along curve
const getBezierQuadraticEquationXYCoordsAtPercent = (curve, percent) => {
  let x = Math.pow(1 - percent, 2) * curve.x + 2 * (1 - percent) * percent
    * curve.cpx + Math.pow(percent, 2) * curve.endx
  let y = Math.pow(1 - percent, 2) * curve.y + 2 * (1 - percent) * percent
    * curve.cpy + Math.pow(percent, 2) * curve.endy

  return { x, y }
}

const drawCurve = () => {
  curveElement.setAttribute(
    'd',
    `M${curve.x},${curve.y} Q${curve.cpx},${curve.cpy} ${curve.endx},${curve.endy}`
  )
}


const drawThumbUponInput = percent => {

	let position = getBezierQuadraticEquationXYCoordsAtPercent(curve, percent)

  const seconds = 1514818906 + percent * 31536000;
  const dateToDisplay = new Date(seconds * 1000);
   var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
   var month = months[dateToDisplay.getMonth()];
   var date = dateToDisplay.getDate();

   console.log(dateToDisplay);

   const formattedDate = date + ' ' + month;

  document.getElementById('value').textContent = formattedDate;

  thumbElement.setAttribute('cx', position.x)
  thumbElement.setAttribute('cy', position.y)
  console.log(thumbElement);
}



const drawThumb = percent => {

	let position = getBezierQuadraticEquationXYCoordsAtPercent(curve, percent)

  const seconds = 1514818906 + percent * 31536000;
  const dateToDisplay = new Date(seconds * 1000);
   var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
   var month = months[dateToDisplay.getMonth()];
   var date = dateToDisplay.getDate();

   console.log(dateToDisplay);

   const formattedDate = date + ' ' + month;

  document.getElementById('value').textContent = "Slide to choose a date";

  thumbElement.setAttribute('cx', position.x)
  thumbElement.setAttribute('cy', position.y)
  console.log(thumbElement);
}

const moveThumb = e => {
  console.log(e.target.value)
  percent = e.target.value / 31536000
  drawThumbUponInput(percent)
}

// event on the range input
let rangeElement = document.getElementById('range')
rangeElement.value = percent * 100
rangeElement.addEventListener('input', moveThumb)


// init
drawCurve()
drawThumb(percent)

})
