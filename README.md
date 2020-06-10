# FlightBoard
A replica of the flights arrival board in the virtual world
Tech used:
* Node-fetch
* EJS partials
* Flightaware API
* Google maps static api
* express-sessions
* MongoDB
* Express.js
* Node.js
* Dot-env
* Jquery
* Bcrypt
* boostrap


Approach:
* I started out tickering with the authentication and session stuff. Once I got that working, I began framing out my index.ejs and flight show.ejs files. For the index page, my goal was to mimic a real life arrivals board you’d see at an airport. The show page highlights some of the more interesting stats from flightaware’s api, like altitude and speed, for funsies. 

Challenges:
* Not all airports have IATA codes, so when the code encounters them, it skips over trying to convert them from ICAO.

* Handling the promises necessary for the lookups that handle the ICAO to IATA code conversion was a headache. I was very new to promises and how to handle async operations in JS until this project.

* Search is hard. The search box can’t handle city names because a lot of cities have more than one airport and I simply didn’t have the time to craft out how to handle that in the search. It would definitely involve more promises tho.

Other things I’d like to do:
* I’d like to get it setup so that when a user visits the site, it automagically selects the nearest major airport and displays arrivals there

* I’d also like to implement infinite scroll, right now the index is limited to the top 15 results

* The show detail page needs arrival flight info for flights not yet landed

* User’s should be able to store fav airports and tracked flights. 

* I’d also like to add some visual detail so users knew they could tap a flight to get more info on the index page, currently most people don’t try that on their own. UX is hard.
