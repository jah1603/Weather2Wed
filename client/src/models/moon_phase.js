const moonPhaseMethods = function() {
  this.sunCoordinates = null;
  this.moonCoordinates = null;
  this.year1970InJulianCalendarDays = 2440588;
};

// Astronomical calculations are approximate, mainly based on material found at http://aa.quae.nl/

moonPhaseMethods.prototype.calculateCoordinatesOfTheSun = function (date) {

};

moonPhaseMethods.prototype.calculateCoordinatesOfTheMoon = function (date) {

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

  // If the user searches for a month of the year which comes before the current month in the calendar, this method automatically converts it into the same month and day one year ahead. This means that the moon phase will always predict future data, no matter when the app is used.

  return dateForCalculations.valueOf() / (1000*60*60*24) - 0.5 + this.year1970InJulianCalendarDays;

  // Must convert the date into calendar days since the year 2000, as this is the year that the data on planet positions was taken from.
};

moonPhaseMethods.prototype.calculateMoonPhase = function (date) {

  this.calculateCoordinatesOfTheSun(date);
  this.calculateCoordinatesOfTheMoon(date);

  const avgSunEarthDistance = 149597870; //Measured in km
  const weddingDate = this.futureproofWeddingDate(date);
  const sunCoordinates = this.sunCoordinates;
  const moonCoordinates = this.moonCoordinates;

        var phi = Math.acos(Math.sin(avgSunEarthDistance.dec) * Math.sin(m.dec) + Math.cos(avgSunEarthDistance.dec) * Math.cos(m.dec) * Math.cos(avgSunEarthDistance.ra - m.ra))

        var inc = Math.atan2(sdist * Math.sin(phi), m.dist - sdist * Math.cos(phi));

        var angle = Math.atan2(Math.cos(avgSunEarthDistance.dec) * Math.sin(avgSunEarthDistance.ra - m.ra), Math.sin(avgSunEarthDistance.dec) * Math.cos(m.dec) - Math.cos(avgSunEarthDistance.dec) * Math.sin(m.dec) * Math.cos(avgSunEarthDistance.ra - m.ra));


    return {
        var phase = 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI;
    };
};


};

module.exports = moonPhaseMethods;
