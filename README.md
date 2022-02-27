<h1 align="center">Backend - Ekacoffee Web Apps</h1>

Web application for ordering food and drinks,
this application is made using Express JS & Node JS

[More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. xampp)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
3. Type `npm install`
4. Create a database with the name #coffee_intermediate, and Import file sql to **coffee_intermediate**
5. Open Postman desktop application or Chrome web app extension that has installed before
6. Choose HTTP Method and enter request url.(ex. localhost:3000/)
7. You can see all the end point [here](https://documenter.getpostman.com/view/4900367/UVkqrEs2)

# Feature

<ul>
<li>Authentication</li>
<li>Authorization</li>
<li>CRUD Product Data</li>
<li>Search Product</li>
<li>CRUD User Data</li>
<li>Pagination</li>
<li>Upload Image</li>
</ul>

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
NODE_ENV = development

APP_URL=http://localhost:8080
APP_KEY=MyBackend
APP_UPLOAD_ROUTE=/uploads
APP_UPLOAD_PATH=assets/images
APP_TRANSACTION_PREFIX=CS

DB_HOST = localhost
DB_USER = root
DB_PASS =
DB_NAME = coffee_intermediate
```

## License

© [Eka Fajhari Adwar](https://www.instagram.com/ekaadwar/)
