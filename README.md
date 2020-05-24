# js-covid-map


## Background and Overview

Currently, the world is at a halt due to the COVID-19 global pandemic. The purpose of this app is to convey the seriousness and urgency required to stop the spread through D3 data visualization. This app's main functionality is to have a dynamic and interactive map that users can traverse to show the rate of infection, and the speed at which it spread. Being able to see a visual representation of the spread of COVID will communicate better the seriousness of this virus.

<br />

## Functionality and MVPs

1. Connect to Leaflet API and be able to display a map

2. Connect to COVID-19 API and store the data

3. Use D3 to represent the data as an overlay on the map

4. Add input for user to change the date or type of data they want to see

  ### Bonus Functionality

* Graphical representations of different COVID stats over time

<br />

## Wireframes

This app will feature one main page, comprised of a sidebar for holding COVID-19 input fields a user wants to see, and a main section of a world map. The world map will be overlaid with data visualizations based on the user's input. If the bonus functionality is met then a user can scroll down, and look at different graphical interpretations of COVID statistics. 

![Wireframe](https://i.imgur.com/CJkOSPf.png)

<br />

## Architecture and Technologies

* Leaflet API to display world map
* 'COVID-19 Statistics API' to get COVID-19 data
* D3 to display the data on the map

`map.js` will hold the logic for rendering and positioning on the map<br />
`covid_stats.js` will be responsible for getting data and stats from COVID API<br />
`data_display.js` will take in the appropriate data and render it over the map<br />

<br />

## Implementation Timeline

* Day 1: Setup file structure and bundle with webpack. Connect to Leaflet and get the map displaying properly.

* Day 2: Set up sidebar and get appropriate data from COVID API based on a users input

* Day 3: Using D3 be able to display the data on the map

* Day 4: Set up hover effects that display selected data

* Day 5: Finish anything that's not completed/DRY up code. Add bonus functionality
