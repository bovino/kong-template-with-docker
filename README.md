Kong plugin template WITH DOCKER / DOCKER COMPOSE
====================

This repository contains a very simple Kong plugin template to get you
up and running quickly for developing your own plugins.

This template was designed to work with the
[`kong-pongo`](https://github.com/Kong/kong-pongo).

Please check out this repo `README` files for usage instructions.

This project is a fork of the original kongo template with Docker setup including Kong itself (with the plugin already activated in one service) and Konga GUI

To start the containers:
`docker-compose up or docker-compose up -d`

To use Konga GUI go to (http://localhost:1337), configure an admin user, log in and creatre a connection pointed to http://kong:8001.

Now you can make a request to a route and see the activated plugin in action.
To perform this, just make a GET request to (http://localhost:8000/v1/my-plugin-data).

To confirm the plugin is activated and working, look the response headers or check the logs being printed in the terminal (running docker-compose with -d flag).

To stop the containers:
`docker-compose down`
