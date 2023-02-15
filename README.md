# Cache Manager

# README #
This README document will provide steps to get this application up and running.
Code challenge details are in the `Code_challenge.pdf` file.

### Basic steps ###
- `Create .env file`
  - `To run the project in copy `.env.development` to `.env
- `Run 'nvm' ` (within the directory) ( or use NodeJs v16.x )
- `Run 'npm install' or 'npm i'` (within the directory)
- `To start the project :`
  - `Type the command in the terminal 'npm start'`
- `In the development environment, the server will start on port 9100`

### Run with Docker ###
- `Run 'docker-compose up'`

### Configurations ###

- Database configurations in `./src/configs/database/mongodb.js`

### Docker ###

- Containers :
  - Nodejs server :
    - container name  = `gateway-manager-server`
    - port            = `9100`
  - MongoDB :
    - container name  = `gateway-manager-mongodb-service`
    - port            = `27017`

### Third-party libraries and usage ###

#### Dependencies ####

* `body-parser`         - Node.js body-parsing middleware
* `dotenv`              - Loads environment variables from a .env file into the process.env
* `mongoose`            - Mongodb schema solution
* `joi`                 - Request data validation

#### Dev-Dependencies ####

* `babel-eslint`  - Linting utility
* `eslint`        - Linting utility
* `prettier`      - Linting utility
* `nodemon`       - Automatically restarting the node application when files changes

#### Folder structure ####

* `src`             - Source codes root directory
  * `configs`       - Configuration files ( Database/Caching )
    * `database`
    * `constants.js`- Constant values
  * `controllers`   - Controller files
  * `helpers`       - Helper functions
  * `middleware`    - Middleware functions
  * `models`        - Database schemas & models
  * `routes`        - API routes layer
  * `services`      - Services files
  * `validations`   - Request data validation
  * `server.js`     - Entry file
* `.dockerignore`
* `.env.*`          - For environment variables
* `.eslintrc.json`
* `gitignore`
* `.nvmrc`          - Nodejs version
* `.prettierrc`
* `docker-compose.yml`
* `Dockerfile`
* `package-lock.json`
* `package.json`
* `README.md`


#### TODO ####
* `Unit tests`
* `Swagger documentation`

#### Areas can improve ####
* `Response data handeling`
* `Error handling`
* `Error logging`
* `Typescript integration`