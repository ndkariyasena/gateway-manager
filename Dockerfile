FROM        node:18.12.1

WORKDIR     /usr/src/app

COPY        package.json ./

# Get correct env file by environment
ARG         BUILD_PROFILE=development

COPY        .env.${BUILD_PROFILE} ./.env

RUN         npm install

COPY        . .

#Expose the port
ARG         PORT=9100

EXPOSE      ${PORT}

CMD         ["npm", "start"]