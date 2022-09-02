# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---
# Coding Challenge - LeafiHome

This project is coding challenge given by LeafiHome.

I have implemented backend server for publisher-subcriber pattern using redis.

* *Last Modification Date*: 02-09-2022
* *Date Created*: 30-08-2022


    | Requirements | Completion Status |
    | :---:         |     :---:      |
    | Setting up Subscription   | ✅ |
    | Publishing an event    | ✅|

## Authors
* [Fenil Milankumar Parmar](fenil.cad@gmail.com) - *(Developer)*

## Prerequisites

Please set up your localmachine with below softwares, libraries, and plugins.

* [Visual Studio Code](https://code.visualstudio.com/) - Visual Studio code is a development tool. I used it to implement this project. Download it for better understanding and better visualization of my project code.
* [Node](https://nodejs.org/en/) - Download the node from the given link.


## Installing

To install the project in your local machine do the following steps.

* Download all the dependencies by using command `npm install`.

* Install redis for server following steps from this url.
https://redis.io/docs/getting-started/installation/install-redis-on-windows/

* Install WSL in windows to have ubuntu on your system
1) `wsl --list --online`
2) `wsl --install -d ubuntu`
3) `set username and password`
4) `sudo apt-get install redis`
5) `sudo service redis-server start`
6) `redis-cli`

Run the application by using command in server folder `node index.js`.


## Built With
* [Google chrome Browser](https://www.google.com/intl/en_ca/chrome/) - used as a visual tool to visualize the functionality of the web application.
* [NPM](https://www.npmjs.com/) - The package manager for  [Node](https://nodejs.org/).
* [Visual Studio Code](https://code.visualstudio.com/download) - IDE.


## External Dependencies Used
* [@ioredis](https://www.npmjs.com/package/ioredis) - For publisher-subscriber.

## Backend API Endpoint

* `POST`  **Subscribe to Topic**:
```
    http://localhost:8000/subscriber/{TOPIC} 
    body: {url: <URL>}
```

* `POST`  **Publish to Topic**:
```
    http://localhost:8000/publish/{TOPIC} 
    body: {message: <message>}
```

* `GET`  **Get event messages published by publisher**:
```
    http://localhost:8000/event/
```