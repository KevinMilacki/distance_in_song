# Distance in Song

An application to show the amount of times a song can be played from point a to point b built in React.

This application works in conjunction with the backend software located in the [Express Backend](https://github.com/KevinMilacki/express-backend)
---

## Requirements for Project
**These are a list of the features that were required by WebDev2 project.**

-Analyze data that is stored in arrays, objects, sets or maps and display information about it in your app.
-Create a function that accepts two or more input parameters and returns a value that is calculated or determined by the inputs.  Basic math functions don’t count (e.g. addition, etc).
-Visualize data in a user friendly way. (e.g. graph, chart, etc)
-Retrieve data from a third-party API and use it to display something within your app.
-Create a node.js web server using a modern framework such as Express.js or Fastify.  Serve at least one route that your app uses (must serve more than just the index.html file).
-Implement modern interactive UI features (e.g. table/data sorting, autocomplete, drag-and-drop, calendar-date-picker, etc).
-Develop your project using a common JavaScript framework such as React, Angular, or Vue.

**Below is how these were implemented.** 

- Created a Node.js application to call the Spotify APIs token process, and to call the Google Maps Distance Matrix API and the Google Maps Lat/lng processes
- Retriving Song title/Length/Picture using a form to call the Spotify API
- Retrive the distance in MS from the Google Maps API, using Places to autocomplete get the address
- Created a custom formula using the Data inputed on both ends to calculate the amount of times a song will play form Point A to Point B
- Developed the application using the React enviroment
---

To install the project you will need to clone the repo and run `npm install` in the project folder to initiate all of the dependencies.
Followed by running `npm config set legacy-peer-deps true`
The Express backend also needs to be running and the provided secrets will need to be added to that repos .env file to run.

*if the Google Side is stuck with Loading... interact with the MapWithAutocomplete.js file in your code editor by adding a space anywhere and it will cause a load, future versions will have this bug fixed.*


  

