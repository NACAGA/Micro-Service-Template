# Microservice Template

Use this template as a starting point for your microservice.

### Labels

In order to keep labels consitent across micro services, we will use the template available in the docs folder of this repo to auto populate
the new repo with labels. After running "npm install", run the following commands from the server directory:

```bash
    npx ghlbl -o NACAGA -r <name-of-new-repo> -t <organization-pat> -d
```

```bash
    npx ghlbl -o NACAGA -r <name-of-new-repo> -t <organization-pat> -i docs/labels.json
```

## Overview

This template hosts a barebones microservice that keeps track of people and their favorite colors. It is built using Node.js, Express, and MariaDB.

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

To start the database in a docker container, run the following command:

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

## Template Structure

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

The `src` folder contains the source code of the microservice. This is organized in route-controller-service model. The `test` folder contains the unit tests. The `database` folder contains the database initialization script and the `Dockerfile` to build the database image. The `docs` folder contains the labels for the issues, and other markdown files can go here. The `docker-compose.yml` file contains the configuration to run the microservice and the database together at one time. 

## Database

### Database Type

The microservice uses a relational database system, specifically MariaDB.

### Database Schema

The following tables constitute the database schema:

#### People Table

Stores information about people.

| Column       | Type     | Description                    |
| ------------ | -------- | ------------------------------ |
| `id`         | INT      | Unique user identifier         |
| `name`       | VARCHAR  | User's username                |
| `favorite_color` | VARCHAR  | User's favorite color          |


## Endpoints

### Base URL

The base URL will be dependent on where you run it from and the port specified in the `.env` file. For example, if you run it locally, the base URL will likely be `http://localhost:3000`.

#### `GET /`

-   **URL**: `/`
-   **Method**: `GET`
-   **Description**: Health check endpoint
-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {}
    }
    ```

    ```json
    {
        "message": "ok"
    }
    ```

#### `POST /template/create-person`

-   **URL**: `/template/create-person`
-   **Method**: `POST`
-   **Description**: Creates a person
-   **Query Parameters**:

    | Parameter | Type   | Description           |
    | --------- | ------ | --------------------- |
    | `name`  | String | Person's name |
    | `favoriteColor`  | String | Person's favorite color |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "name": "john",
            "favoriteColor": "blue"
        }
    }
    ```

    Response

    ```json
    {
        "message": "Person successfully created",
        "person": {
            "name": "john",
            "favoriteColor": "blue"
        }
    }
    ```

#### `PATCH /template/update-person`

-   **URL**: `/template/update-person`
-   **Method**: `PATCH`
-   **Description**: Updates a person
-   **Query Parameters**:

    | Parameter | Type   | Description           |
    | --------- | ------ | --------------------- |
    | `name`  | String | Person's name |
    | `favoriteColor`  | String | Person's favorite color |

-   **Example**:
    
    Request

    ```json
    {
        "headers": {},
        "body": {
            "name": "john",
            "favoriteColor": "red"
        }
    }
    ```

    Response

    ```json
    {
        "message": "Person successfully updated",
        "person": {
            "name": "john",
            "favoriteColor": "red"
        }
    }
    ```

#### `GET /template/get-people`

-   **URL**: `/template/get-people`
-   **Method**: `GET`
-   **Description**: Gets all people

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {}
    }
    ```

    Response

    ```json
    {
        "message": "People successfully retrieved",
        "people": [
            {
                "name": "john",
                "favoriteColor": "red"
            },
            {
                "name": "jane",
                "favoriteColor": "blue"
            }
        ]
    }
    ```

#### `DELETE /template/delete-person`

-   **URL**: `/template/delete-person`
-   **Method**: `DELETE`
-   **Description**: Deletes a person
-   **Query Parameters**:

    | Parameter | Type   | Description           |
    | --------- | ------ | --------------------- |
    | `name`  | String | Person's name |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "name": "john"
        }
    }
    ```

    Response

    ```json
    {
        "message": "Person successfully deleted",
        "person": {
            "name": "john",
        }
    }
    ```