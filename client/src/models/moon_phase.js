const moonPhaseMethods = function() {
  this.sunCoordinates = null;
  this.moonCoordinates = null;
  this.year1970InJulianCalendarDays = 2440588;
  this.radian = Math.PI / 180
  this.axialTiltOfEarthInRadians = this.radian * 23.4397;
};

// Astronomical calculations are approximate, mainly based on material found at http://aa.quae.nl/

moonPhaseMethods.prototype.calculateCoordinatesOfTheSun = function (date) {

};

moonPhaseMethods.prototype.calculateCoordinatesOfTheMoon = function (date) {

  // Moon's ecliptic coordinates relative to the centre of the Earth

    var eclipticLongitude = this.radian * (218.316 + 13.176396 * date);

    var meanAnomaly = this.radian * (134.963 + 13.064993 * date);

    var meanDistance = this.radian * (93.272 + 13.229350 * date);

    var longitude  = eclipticLongitude + this.radian * 6.289 * Math.sin(meanAnomaly);

    var latitude = this.radian * 5.128 * Math.sin(meanDistance);

    var distanceToMoonInKM = 385001 - 20905 * Math.cos(meanAnomaly);

    return {
        ra: rightAscension(l, b),
        dec: declination(l, b),
        distance: distanceToMoonInKM
    };

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

  //The long term in brackets is the number of milliseconds in a day.

  return (dateForCalculations.valueOf() / (1000*60*60*24) - 0.5 + this.year1970InJulianCalendarDays) - 2451545;

  // We must convert the date into calendar days since the year 2000, as this is the year that the data on planet positions was taken from.

  // 2451545 is the year 2000 in Julian days.
};

moonPhaseMethods.prototype.calculateMoonPhase = function (date) {

  this.calculateCoordinatesOfTheSun(date);
  this.calculateCoordinatesOfTheMoon(date);

  const avgSunEarthDistance = 149597870; //Measured in km
  const weddingDate = this.futureproofWeddingDate(date);
  const sunCoordinates = this.sunCoordinates;
  const moonCoordinates = this.moonCoordinates;

        var phi = Math.acos(Math.sin(sunCoordinates.dec) * Math.sin(m.dec) + Math.cos(sunCoordinates.dec) * Math.cos(m.dec) * Math.cos(sunCoordinates.ra - m.ra))

        var inc = Math.atan2(sdist * Math.sin(phi), moonCoordinates.dist - sdist * Math.cos(phi));

        var angle = Math.atan2(Math.cos(sunCoordinates.dec) * Math.sin(sunCoordinates.ra - moonCoordinates.ra), Math.sin(sunCoordinates.dec) * Math.cos(moonCoordinates.dec) - Math.cos(sunCoordinates.dec) * Math.sin(moonCoordinates.dec) * Math.cos(sunCoordinates.ra - moonCoordinates.ra));


    return {
        var phase = 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI;
    };
};


};

module.exports = moonPhaseMethods;
