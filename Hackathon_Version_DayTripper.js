function MessageHandler (context, event) {
  if (event.message == 'hello') {
    context.sendResponse("Hi, welcome to Day Tripper. \nWhere would you like to go?\nType in your destination's address beginning with the @ sign.")
  }
  if (event.message.indexOf('@') != -1) {
    dest = event.message.substring(1)
    destCityBeg = dest.indexOf(',')
    destCitySub = dest.substring(destCityBeg + 1)
    destCityEnd = destCitySub.indexOf(',')
    if (destCityEnd == -1) {
      destCityEnd = destCitySub.length
    }
    destCityName = destCitySub.substring(0, destCityEnd)

    // OpenWeatherMap Daily Forecast API used for sky and temperature weather information
    openWeather = getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + destCityName + '&cnt=1&appid=b68627eccd22e11a0fcad0c80ebbd610')

    condBeg = openWeather.indexOf('main') + 7
    condSub = openWeather.substring(condBeg)

    condEnd = condSub.indexOf('"')

    condition = condSub.substring(0, condEnd)

    switch (condition) {
      case 'Clouds':
        context.sendResponse("It's going to be cloudy.")
        break
      case 'Rain':
        context.sendResponse("You'll need an umbrella--it's going to be raining.")
        break
      case 'Clear':
        context.sendResponse('Clear skies ahead!')
        break
    }

    tempMinBeg = openWeather.indexOf('min') + 5
    tempMinSub = openWeather.substring(tempMinBeg)
    tempMinEnd = tempMinSub.indexOf(',')
    tempMin = tempMinSub.substring(0, tempMinEnd)

    fahrenheitTempMin = Math.round((1.8 * (parseFloat(tempMin) - 273)) + 32)

    if (fahrenheitTempMin >= 80) {
      context.sendResponse(Math.round(fahrenheitTempMin) + ' degrees (F) - ' + "It's going to be hot out. You will not need a jacket. Maybe some shorts and a T-shirt.")
    } else if (fahrenheitTempMin >= 70) {
        		context.sendResponse(Math.round(fahrenheitTempMin) + ' degrees (F) - ' + "It's going to be warm out. You probably will not need a jacket. Maybe some long pants and a T-shirt.")
    } else if (fahrenheitTempMin >= 50) {
      context.sendResponse(Math.round(fahrenheitTempMin) + ' degrees (F) - ' + "It's going to be cool out. You might need a jacket. Long pants and a long-sleeved shirt would do as well.")
    } else if (fahrenheitTempMin < 50) {
      context.sendResponse(Math.round(fahrenheitTempMin) + ' degrees (F) - ' + "It's going to be cold out. You should put on a jacket. Dress warmly in layers.")
	    }

    // MapQuest Directions API used for transit time estimates
	    mapsTravelTime = getJSON('http://www.mapquestapi.com/directions/v2/route?key=0HG8b7rdqIkwZdFNGenpycewpmvze9KB&from=' + '1020 Enterprise Way,Sunnyvale,CA' + '&to=' + dest + '&callback=renderNarrative')

    travelTimeBeg = mapsTravelTime.indexOf('formattedTime') + 16
    travelTimeSub = mapsTravelTime.substring(travelTimeBeg)

    travelTimeString = travelTimeSub.substring(0, 5)

    travelTimeHours = travelTimeString.substring(0, 2)

    travelTimeMinutes = travelTimeString.substring(3)

    if (travelTimeHours.substring(0, 1) == '0') {
      travelTimeHours = travelTimeHours.substring(1)
    }

    if (travelTimeMinutes.substring(0, 1) == '0') {
      travelTimeMinutes = travelTimeMinutes.substring(1)
    }

    if (travelTimeHours == '0') {
      if (travelTimeMinutes == 1) {
        context.sendResponse('It will take you ' + travelTimeMinutes + ' minute to get there.')
      } else {
        context.sendResponse('It will take you ' + travelTimeMinutes + ' minutes to get there.')
      }
    } else {
      if (travelTimeHours == 1) {
        context.sendResponse('It will take you ' + travelTimeHours + ' hour and ' + travelTimeMinutes + ' minutes to get there.')
      } else {
        context.sendResponse('It will take you ' + travelTimeHours + ' hours and ' + travelTimeMinutes + ' minutes to get there.')
      }
    }
  }
}

// Function to retrieve raw JSON files from APIs - function (due to XMLHttpRequest) only works on Gupshup emulator for now
function getJSON (url) {
  var response
  var xmlHttp

  response = ''
  xmlHTTP = new XMLHttpRequest()

  if (xmlHTTP !== null) {
    xmlHTTP.open('GET', url, false)
    xmlHTTP.send(null)
    response = xmlHTTP.responseText
  }

  return response
}

function EventHandler (context, event) {
  if (!context.simpledb.botleveldata.numinstance) { context.simpledb.botleveldata.numinstance = 0 }
  numinstances = parseInt(context.simpledb.botleveldata.numinstance) + 1
  context.simpledb.botleveldata.numinstance = numinstances
  context.sendResponse('Thanks for adding me. You are:' + numinstances)
}

function HttpResponseHandler (context, event) {
  context.sendResponse(event.getresp)
}

function DbGetHandler (context, event) {
  context.sendResponse('testdbput keyword was last get by:' + event.dbval)
}

function DbPutHandler (context, event) {
  context.sendResponse('testdbput keyword was last put by:' + event.dbval)
}
