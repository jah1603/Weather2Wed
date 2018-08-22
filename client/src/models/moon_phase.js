const moonPhaseMethods = function() {

  this.sunCoordinates = null;
  this.moonCoordinates = null;
  this.year1970InJulianCalendarDays = 2440588;
  this.radian = Math.PI / 180
  this.axialTiltOfEarthInRadians = this.radian * 23.4397;
  this.moonPhase = null;

};

// Astronomical calculations are approximate, mainly based on material found at http://aa.quae.nl/

moonPhaseMethods.prototype.calculateCoordinatesOfTheSun = function (date) {

  var solarMeanAnomaly = this.radian * (357.529 + 0.98560028 * date);


  var centreEquation = this.radian * (1.9148 * Math.sin(solarMeanAnomaly) + 0.02 * Math.sin(2 * solarMeanAnomaly) + 0.0003 * Math.sin(3 * solarMeanAnomaly)) // Finds the centre of the Sun

  var perihelionOfEarth = this.radian * 102.9372; //Perihelion of the Earth

  var eclipticLongitude = solarMeanAnomaly + perihelionOfEarth + centreEquation + Math.PI;

   return {

       declination:

       Math.asin(Math.sin(0) * Math.cos(this.axialTiltOfEarthInRadians) + Math.cos(0) * Math.sin(this.axialTiltOfEarthInRadians) * Math.sin(eclipticLongitude)),

       rightAscension: Math.asin(Math.sin(0) * Math.cos(this.axialTiltOfEarthInRadians) + Math.cos(0) * Math.sin(this.axialTiltOfEarthInRadians) * Math.sin(eclipticLongitude))

   };

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

        rightAscension:

        Math.atan2(Math.sin(longitude) * Math.cos(this.axialTiltOfEarthInRadians) - Math.tan(latitude) * Math.sin(this.axialTiltOfEarthInRadians), Math.cos(longitude)),


        declination:

        Math.asin(Math.sin(latitude) * Math.cos(this.axialTiltOfEarthInRadians) + Math.cos(latitude) * Math.sin(this.axialTiltOfEarthInRadians) * Math.sin(longitude)),

        distance: distanceToMoonInKM

    };

};

moonPhaseMethods.prototype.futureproofWeddingDate = function (userWeddingDate) {

  const secondsPerAstronomicalYear = 31557600;
  const currentDateInUnix = new Date();
  const currentDateUnixMidnight = currentDateInUnix.setHours(0, 0, 0, 0);
  const currentDateAtMidnight = currentDateUnixMidnight/1000;

  const userWeddingDateYear = new Date(userWeddingDate * 1000).getFullYear();
  const currentDateYear = new Date( currentDateUnixMidnight).getFullYear();

  const yearDifferential = currentDateYear - userWeddingDateYear;

  console.log(yearDifferential);

  // Initialize a series of if statements to ensure that the date used in the moon phase calculations is a future date

  if (userWeddingDate < currentDateAtMidnight){
    var dateForCalculations = userWeddingDate + 31557600 + (yearDifferential * 31557600);
  }
  else {
    var dateForCalculations = userWeddingDate;
  };

  // If the user searches for a month of the year which comes before the current month in the calendar, this method automatically converts it into the same month and day one year ahead. This means that the moon phase will always predict future data, no matter when the app is used.

  //The long term in brackets is the number of milliseconds in a day.

  return (dateForCalculations.valueOf() / 1000*60*60*24 - 0.5 + this.year1970InJulianCalendarDays) - 2451545;

  // We must convert the date into calendar days since the year 2000, as this is the year that the data on planet positions was taken from.

  // 2451545 is the year 2000 in Julian days.
};

moonPhaseMethods.prototype.calculateMoonPhase = function (date) {

    const weddingDateInDays = this.futureproofWeddingDate(date);

  this.sunCoordinates = this.calculateCoordinatesOfTheSun(weddingDateInDays);

  this.moonCoordinates = this.calculateCoordinatesOfTheMoon(weddingDateInDays);

  const avgSunEarthDistance = 149597870; //Measured in km

  const sunCoordinates = this.sunCoordinates;
  const moonCoordinates = this.moonCoordinates;

        var phi = Math.acos(Math.sin(sunCoordinates.declination) * Math.sin(moonCoordinates.declination) + Math.cos(sunCoordinates.declination) * Math.cos(moonCoordinates.declination) * Math.cos(sunCoordinates.rightAscension - moonCoordinates.rightAscension))

        var inc = Math.atan2(avgSunEarthDistance * Math.sin(phi), moonCoordinates.distance - avgSunEarthDistance * Math.cos(phi));

        var angle = Math.atan2(Math.cos(sunCoordinates.declination) * Math.sin(sunCoordinates.rightAscension - moonCoordinates.rightAscension), Math.sin(sunCoordinates.declination) * Math.cos(moonCoordinates.declination) - Math.cos(sunCoordinates.declination) * Math.sin(moonCoordinates.declination) * Math.cos(sunCoordinates.rightAscension - moonCoordinates.rightAscension));


    return 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI;


};


module.exports = moonPhaseMethods;
