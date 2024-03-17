<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="80" alt="Nest Logo" /></a>
</p>
<h1 align="center">Pick One Name BE</h1>

## Description

Pick One Name BE

## Installation

```bash
$ yarn install
```

## Folder structure

```shell
├── __mocks__                       # Mocks for testing.
├── .github                         # GitHub configuration.
├── .husky                          # Linting runs before commits and pushs.
├── .vscode                         # VSCode configuration.
├── dist                            # Compiled code ready for deployment.
├── docs                            # Project documentation.
src
├── common
│   ├── constants                   # Constant values and configurations.
│   ├── decorators                  # Global request/response modifiers.
│   ├── dtos                        # Data transfer classes for API communication.
│   ├── entities                    # Data models representing entities.
│   ├── filters                     # Data filtering logic.
│   ├── interceptors                # Global request/response modifiers.
│   ├── interfaces                  # Definition of expected structures and behaviors.
│   ├── middlewares                 # Processing components before main logic.
│   └── utils                       # General utility functions/helpers.
├── configs                         # Module configuration.
├── database
│   ├── factories                   # Generating data depend environment.
│   ├── migrations                  # Managing database schema changes.
│   └── seeds                       # Populating the database with initial data.
└── modules                         # Core application functionality organized by feature.
    ├── app
    ├── auth
    ├── base
    ├── posts
    ├── refresh-tokens
    ├── shared
    ├── socket
    └── users
├── test                            # E2E testcases.
├── types                           # TypeScript type definitions.
```

## Prepare before running the app

### 1. Setup database

```bash
# Step 1

yarn db:up        # Setup database
yarn dbtest:up    # Setup database for E2E testing
yarn redis:up     # Setup Redis
# You can run 3 scripts above one time with:
yarn docker:up
```

### 2. Create DB structure and seed data

```bash
yarn data:init    # Run migrations and seed data
yarn data:e2einit      # Run migrations for testing database
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# Run all Unit testcases
$ yarn run test

# Run single Unit testcase
$ yarn run test src/modules/app/app.controller.spec.ts

# Run all E2E testcases
$ yarn run test:e2e

# Run single E2E testcase
$ yarn run test:e2e test/app.e2e-spec.ts

# test coverage
$ yarn run test:cov
```

## Nest command lines

```bash
# generate migration
$ yarn migration:generate src/database/migrations/MigrationName

# create migration
$ yarn migration:create src/database/migrations/MigrationName

# create seed
$ yarn migration:create src/database/seeds/MigrationName
```

## Refs

1. https://typeorm.io/
2. https://docs.nestjs.com/
3. https://jwt.io/
4. https://wanago.io/courses/api-with-nestjs/
