# Microservice Template

Use this template as a starting point for your microservice.

## Structure

```
$ tree -A -L 4 -I node_modules .
├── Dockerfile
├── LICENSE
├── README.md
├── database
│   ├── Dockerfile
│   └── init-template.sql
├── docker-compose.yml
├── docs
│   └── labels.json
├── index.js
├── package-lock.json
├── package.json
├── src
│   ├── app.js
│   ├── configs
│   │   ├── db.config.js
│   │   └── general.config.js
│   ├── controllers
│   │   └── template.controller.js
│   ├── routes
│   │   └── template.route.js
│   └── services
│       ├── createPerson.service.js
│       ├── db.service.js
│       ├── deletePerson.service.js
│       ├── domain
│       │   ├── buisnessErrror.domain.js
│       │   └── success.domain.js
│       ├── getPeople.service.js
│       ├── getUsers.service.js
│       └── updatePerson.service.js
└── test
    ├── template.mock.test.js
    └── template.test.js
```

The `src` folder contains the source code of the microservice. This is organized in route-controller-service model. The `test` folder contains the unit tests. The `database` folder contains the database initialization script and the `Dockerfile` to build the database image. The `docs` folder contains the labels for the issues. The `docker-compose.yml` file contains the configuration to run the microservice and the database together at one time. 

## Setup

You will need to create a `.env` file in the root directory of the project with the following variables:

```bash
MARIADB_PASSWORD=password
MARIADB_USER=user1
MARIADB_DATABASE=dev_database
MARIADB_ROOT_PASSWORD=root_password

DB_HOST=database
DB_PORT=3306
SERVER_PORT=3000
```

## Usage

This template is built around Docker. There will be a Docker container for the database, and an optional docker container the server itself. The database container will be built from the `database/Dockerfile`, and the server container will be built from the `Dockerfile`. The `docker-compose.yml` file will be used to run the database and the server together.

### Starting the Database

To start the database, run the following command:

```bash
[ ! -f .env ] || export $(grep -v '^#' .env | xargs)
docker build -t ams-database database $(for i in `cat .env`; do out+="--build-arg $i " ; done; echo $out;out="")
docker run --rm -d -p $DB_PORT:$DB_PORT --name ams-database-dt ams-database
```

### Starting the Server

To start the server, run the following command:

```bash
npm ci
npm i
DB_HOST=localhost npm start
```

You can also run tests with the following command:

```bash
DB_HOST=localhost npm test
```

### Using Docker Compose

To start the database and the server together using docker compose, run the following command:

```bash
docker compose up --build
```

## Configuration
