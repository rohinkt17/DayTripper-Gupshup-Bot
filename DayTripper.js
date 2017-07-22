function MessageHandler(context, event) {
    if (event.message === 'hello') {
        var introduction = 'Hi, welcome to Day Tripper.\nWhich city are you going to today?\n'
            + 'Type in your destination city beginning with the @ sign to get weather info.';
        context.sendResponse(introduction);
    }

    if (event.message.indexOf('@') != -1) {
        var dest = event.message.substring(1);
        var destCityBeg = dest.indexOf(',');
        var destCitySub = dest.substring(destCityBeg + 1);
        var destCityEnd = destCitySub.indexOf(',');

        if(destCityEnd === -1) {
            destCityEnd = destCitySub.length;
        }

        var destCityName = destCitySub.substring(0, destCityEnd);
        context.simplehttp.makeGet('http://api.openweathermap.org/data/2.5/forecast/daily?q='
            + destCityName + '&cnt=1&appid=b68627eccd22e11a0fcad0c80ebbd610');
    }
}

function HttpResponseHandler(context, event) {
    var weatherJson = JSON.parse(event.getresp);
    var response = '';
    var condition = weatherJson.list[0].weather[0].main;

    switch(condition) {
        case 'Clouds': 
            response += 'It\'s going to be cloudy.';
            break;
        case 'Rain': 
            response += 'You\'ll need an umbrella--it\'s going to be raining.';
            break;
        case 'Clear': 
            response += 'Clear skies ahead!';
            break;
    }

    var temp = weatherJson.list[0].temp.day;
    var fahrenheitTemp = Math.round((1.8*(parseFloat(temp) - 273)) + 32);

    if (fahrenheitTemp >= 80) {
        response += '\n' + Math.round(fahrenheitTemp) + ' degrees (F) - '
            + 'It\'s going to be hot out. You will not need a jacket. Maybe some shorts and a T-shirt.';
    } else if (fahrenheitTemp >= 70) {
        response += '\n' + Math.round(fahrenheitTemp) + ' degrees (F) - '
            + 'It\'s going to be warm out. You probably will not need a jacket. Maybe some long pants and a T-shirt.';
    } else if (fahrenheitTemp >= 50) {
        response += '\n' + Math.round(fahrenheitTemp) + ' degrees (F) - '
            + 'It\'s going to be cool out. You might need a jacket. Long pants and a long-sleeved shirt would do as well.';
    } else if (fahrenheitTemp < 50) {
        response += '\n' + Math.round(fahrenheitTemp) + ' degrees (F) - '
            + 'It\'s going to be cold out. You should put on a jacket. Dress warmly in layers.';
    }

    context.sendResponse(response);
}

function EventHandler(context, event) {
    if (!context.simpledb.botleveldata.numinstance)
        context.simpledb.botleveldata.numinstance = 0;
    numinstances = parseInt(context.simpledb.botleveldata.numinstance) + 1;
    context.simpledb.botleveldata.numinstance = numinstances;
    context.sendResponse('Thanks for adding me. You are:' + numinstances);
}

function DbGetHandler(context, event) {
    context.sendResponse('testdbput keyword was last get by:' + event.dbval);
}

function DbPutHandler(context, event) {
    context.sendResponse('testdbput keyword was last put by:' + event.dbval);
}
