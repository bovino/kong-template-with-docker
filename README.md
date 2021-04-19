Kong plugin template WITH DOCKER / DOCKER COMPOSE
====================

This repository contains a simple Kong plugin template to get you
up and running quickly for developing your own plugins.

In fact, this "template" has two custom plugin samples both installed and activated, one in Lua and the other
using JavaScript, running in the new kong-js-pdf (please check here https://www.npmjs.com/package/kong-pdk
and also here https://github.com/Kong/kong-js-pdk). The template is also configured to use the new 2.4.x release
of Kong (using 2.4.0-alpine docker image).

This template was designed to work with the
[`kong-pongo`](https://github.com/Kong/kong-pongo).

Please check out this repo `README` files for usage instructions.

This project is a fork of the original kongo template project with the addition of Docker setup for Kong itself (with two custom plugins already activated in one service), kong-js-pdk (needed to run the JavaScript plugin sample) and Konga GUI

To start the containers:
`docker-compose up or docker-compose up -d`

You need the following ports available:
- 8000 (Kong the API Gateway)
- 8001 (Kong Admin API)
- 1337 (Konga GUI)
- 8444

To use Konga GUI go to (http://localhost:1337), configure an admin user, log in and creatre a connection pointed to http://kong:8001.

Now you can make a request to a route and see the activated plugin in action.
To perform this, just make a GET request to (http://localhost:8000/v1/my-plugin-data).

To confirm the plugin is activated and working, look the response headers or check the logs being printed in the terminal (running docker-compose with -d flag).

To stop the containers:
`docker-compose down`
