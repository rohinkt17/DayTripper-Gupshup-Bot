# Day Tripper
Simple, conversational Gupshup chatbot to assist you in planning for a short day trip.
Uses OpenWeatherMap API for sky and temperature weather information and MapQuest Directions API for transit time estimates.

**UPDATE:**
The working version of Day Tripper can be found in the file DayTripper.js. The original version from BASEHacks can be found in the file Hackathon_Version_DayTripper.js. Since Gupshup limits chatbots to one HTTP request per bot, only weather information is now provided by Day Tripper. I may implement Day Tripper on a different platform to get around this limitation. For now, you can test this chatbot on any of Gupshup's [supported messaging platforms](https://www.gupshup.io/developer/demobots). On the messaging platform of your choice, type in the following:
```
proxy DayTripperBASEHacks
```
After the Gupshup proxy bot responds, type in the following to start talking to the chatbot:
```
hello
```

Built at BASEHacks 2016 by [@rohintangirala](https://github.com/rohintangirala) and [@anikgupta2013](https://github.com/anikgupta2013)
