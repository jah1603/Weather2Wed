const moonPhaseMethods = function() {
  this.sunCoordinates = null;
};

moonPhaseMethods.prototype.calculateCoordinatesOfTheSun = function () {

};

moonPhaseMethods.prototype.convertDateEnteredByUserToNextInstanceOfThatDateInRealTime = function (weddingDate) {

  const secondsPerAstronomicalYear = 31557600;
  const currentDateInUnix = Date.now();
  const currentDateAtMidnight = currentDateInUnix.setHours(0, 0 , 0, 0).getTime()/1000;

  // Initialize a series of if statements to ensure that the date used in the moon phase calculations is a future date

  if (weddingDate < currentDateAtMidnight){
    var dateForCalculations = currentDateAtMidnight + 31557600;
  }
};

moonPhaseMethods.prototype.calculateMoonPhase = function () {

};

module.exports = moonPhaseMethods;
