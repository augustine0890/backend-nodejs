# Nest (NestJS)
- Framework for building efficient, scalable Node.js server-side applications.

## CLI command
- Creates a new (standard mode) Nest project
    - `nest new <name> [options]`
        - `nest new marketplace --package-manage yarn`
- Compiles and runs an application
    - `nest start <name> [options]`
- Generates and/or modifies files based on a schematic
    - `nest generate <schematic> <name> [options]`
        - `nest g co`
- Create validation decorations
    - `yarn add class-validator`
- Transform plain object to some instance of class and versa
    - `yarn add class-transformer`
- Mapped Types
    - `yarn add @nestjs/mapped-types`

## Docker
- Install Docker
- Create a docker-compose and Run docker-compose
    - `docker-compose up -d`

## TYPEORM Module
- `yarn add @nestjs/typeorm typeorm pg`
- Run `.env`
    - `. ./.env`
- Go inside the container
    - `docker exec -it db bash`
- Go to localhose
    - `psql -h localhost -p 5432 -U postgres`
- Migrations
    - `npx typeorm migration:create -n CoffeeRefactor`
    - `npx typeorm migration:run`
    - `npx typeorm migration:revert`
- Build: `yarn build`

## Application Configuration
- `yarn add @nestjs/config`
- `yarn add -D @hapi/joi`

__Exceptions with Filters__
- `nest g filter common/filters/http-exception`
__Protect Routers with Guards__
- `nest g guard common/guards/api-key`
- `nest g mo common`
__Interceptors__
- `nest g interceptor common/interceptors/wrap-response`
- `nest g interceptor common/interceptors/timeout`
__Custom Pipes__
- `nest g pipe common/pipes/parse-int`
__Middleware__
- `nest g middleware common/middleware/logging`

## OpenAPI Specification
- Operations, input parameters, responses, authentication.
- `yarn add @nestjs/swagger swagger-ui-express`

## Testing
- `yarn test` # for unit tests
- `yarn test:cov` # for test coverage
- `yarn test:e2e` # for e2e tests
- `yarn test:watch coffees.service`
- `yarn test:e2e coffees`