# Air Quality Index

Coding challenge for Proximity labs.

## Live Url
- [Air Quality Index](https://airqualityindex-yuvi.web.app/)

## Referance Images
- [Live City wise AQI chart and comparison of AQI](1.jpg)

- [Magnified chart for Live AQI index for one city](2.jpg)

- [Update/change city option](3.jpg)

## Requirements

| Index |                         Requirement                         |
| ----- | ----------------------------------------------------------- |
| 1     | Live City wise AQI chart                                    |
| 2     | AQI mapping with different colors for different categories  |
| 3     | AQI value upto 2 decimal values                             |
| 4     | Comparison of AQI dara with different cities                |
| 5     | Magnified chart for Live AQI index for one city             |
| 6     | Add UI enhancements e.g. SparkLines                         |

## Features
1. The live update of AQ index of cities from recent updates
2. AQI of different cities are compared 
3. View the magnified data for selected city
4. View the historic data using SparkLines chart

## Description
This project has following views
1. Table view - To view live AQ data of all cities (clickable)
2. Bar chart View - To view comparison between cities with AQI reference bar (clickable)
3. SparkLines view - To view live and hestoric data of one city
4. Guage chart view - To view live AQ index of selected city
5. AQ index Table - Table with AQI guide

#### Table view - 
It contains 4 columns,
1. City Name
2. AQ index value (upto 2 decimal)
3. Last Updated on
4. SparkLines chart with live and historical data
User can click on any row to select perticular city, to view AQ index of that city in magnified chart i.e. in Guage chart and SparkLines chart.

#### Bar chart View - 
To compare AQ index between cities.
User can click on any bar in barchar to select perticular city.
It has AQI reference bar on leftmost side.
On mouse hover user will get more information.

#### SparkLines view - 
To view live and hestoric data of one city.
It is present in Table as well as in city detail magnified view.

#### Guage chart view -
To view live AQ index of selected city

#### AQ index Table - 
Table with AQI guide for understanding colors and it's value referance


## Libraries used

| Index |    Library name    |  Version  |
| ----- | ------------------ | --------- |
| 1     | @material-ui/core  | ^4.11.4   |
| 2     | @material-ui/icons | ^4.11.2   |
| 3     | lodash             | ^4.17.21  |
| 4     | react-gauge-chart  | ^0.3.0    |
| 5     | react-sparklines   | ^1.7.0    |
| 6     | recharts           | ^2.0.9    |.

Reason to used this lib 
1. Open source
2. Strong community support
