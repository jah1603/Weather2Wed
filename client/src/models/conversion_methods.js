const ConversionMethods = function () {
}

ConversionMethods.prototype.timeConverterToHours = function (UNIX_timestamp) {

  var a = new Date(UNIX_timestamp * 1000);

  var hour = a.getHours(); // makes time easier to read (presumes wedding is pm!)
  var min = a.getMinutes();
  if (min < 10){
    min = `0${min}`;
  }
  if (hour > 12){
  var time = hour-12 + ':' + min + ' pm'  ;
  }
  else if (hour == 12){
  var time = hour + ':' + min + ' pm' + ' (midday)'  ;
  }
  else if (hour == 0){
  var time = 12 + ':' + min + ' pm' + ' (midnight)'  ;
  }
  else{
  var time = hour + ':' + min + ' am'  ;
  }

  return time;
  }

  ConversionMethods.prototype.timeConverter = function (UNIX_timestamp) {

    var a = new Date(UNIX_timestamp * 1000);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var month = months[a.getMonth()];
    var date = a.getDate();

    if (date == 3) {
     var formattedDate = `${date}rd`
    } else if (date == 2) {
     var formattedDate = `${date}nd`
    }
    else if (date == 1) {
     var formattedDate = `${date}st`
    }
    else if (date == 21) {
     var formattedDate = `${date}st`
    }
    else if (date == 31) {
     var formattedDate = `${date}st`
    }
    else if (date == 22) {
     var formattedDate = `${date}nd`
    }
    else if (date == 23) {
     var formattedDate = `${date}rd`
    }
    else {
     var formattedDate = `${date}th`
    }

    var hour = a.getHours();
    var min = a.getMinutes();
    var time = 'the ' + formattedDate + ' of ' + month  ;

    return time;
    }

  ConversionMethods.prototype.fahrenheitToCelsius = function (fahrenheit) {
      const celsius = Math.round(((fahrenheit - 32)/1.8));
      return celsius;
    };

module.exports = ConversionMethods;
