# Use docker image of cypress 7.2.0 version
FROM cypress/included:7.2.0
WORKDIR /app
# Copy tests and configuration
COPY ./cypress ./cypress
COPY ./cypress.json ./cypress.json
# Copy package.json and tsconfig.json
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
# Install the packages copied
RUN npm i 
# Note: the part npx cypress run --browser chrome --headless can be removed to avoid run tests in docker creation
RUN npx cypress run --browser chrome --headless