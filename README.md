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

