const moonPhaseMethods = function() {
  this.sunCoordinates = null;
};

moonPhaseMethods.prototype.calculateCoordinatesOfTheSun = function () {

};

moonPhaseMethods.prototype.calculateCoordinatesOfTheMoon = function () {

};

moonPhaseMethods.prototype.futureproofWeddingDate = function (userWeddingDate) {

  const secondsPerAstronomicalYear = 31557600;
  const currentDateInUnix = Date.now();
  const currentDateAtMidnight = currentDateInUnix.setHours(0, 0 , 0, 0).getTime()/1000;

  // Initialize a series of if statements to ensure that the date used in the moon phase calculations is a future date

  if (weddingDate < currentDateAtMidnight){
    var dateForCalculations = currentDateAtMidnight + 31557600;
  }
  else {
    var dateForCalculations = userWeddingDate;
  };

  // If the user searches for a month of the year which comes before the current month, this method automatically converts into the equivalent month and day one year ahead. This means that the moon phase will always predict future data.

  return dateForCalculations;
};

moonPhaseMethods.prototype.calculateMoonPhase = function () {

  const avgSunEarthDistance = 149597870; //Measured in km

        var phi = Math.acos(Math.sin(avgSunEarthDistance.dec) * Math.sin(m.dec) + Math.cos(avgSunEarthDistance.dec) * Math.cos(m.dec) * Math.cos(avgSunEarthDistance.ra - m.ra))

        var inc = Math.atan2(sdist * Math.sin(phi), m.dist - sdist * Math.cos(phi));

        var angle = Math.atan2(Math.cos(avgSunEarthDistance.dec) * Math.sin(avgSunEarthDistance.ra - m.ra), Math.sin(avgSunEarthDistance.dec) * Math.cos(m.dec) - Math.cos(avgSunEarthDistance.dec) * Math.sin(m.dec) * Math.cos(avgSunEarthDistance.ra - m.ra));


    return {
        var phase = 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI;
    };
};


};

module.exports = moonPhaseMethods;
