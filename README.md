# Jässäri / youth-membership-ui

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environments

Test: https://jassari.test.kuva.hel.ninja/

Production: -

### Issues board

https://helsinkisolutionoffice.atlassian.net/secure/RapidBoard.jspa?rapidView=23&projectKey=OM&view=planning

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn codegen`

Generate static types for GraphQL queries by using the schema from the backend server.

### `yarn update-translations`

Creates new translation message files based on current version of translation source and overwrites existing files with them.

## Setting up development environment locally with docker

### Set tunnistamo hostname
Add the following line to your hosts file (`/etc/hosts` on mac and linux):

    127.0.0.1 tunnistamo-backend

### Create a new OAuth app on GitHub
Go to https://github.com/settings/developers/ and add a new app with the following settings:

- Application name: can be anything, e.g. local tunnistamo
- Homepage URL: http://tunnistamo-backend:8000
- Authorization callback URL: http://tunnistamo-backend:8000/accounts/github/login/callback/

Save. You'll need the created **Client ID** and **Client Secret** for configuring tunnistamo in the next step.

### Install local tunnistamo
Clone https://github.com/City-of-Helsinki/tunnistamo/. If [this PR](https://github.com/City-of-Helsinki/tunnistamo/pull/94) has not been merged yet, use [this fork](https://github.com/andersinno/tunnistamo/tree/docker-refactor) instead.

Follow the instructions for setting up tunnistamo locally. Before running `docker-compose up` set the following settings in tunnistamo roots `docker-compose.env.yaml`:

- SOCIAL_AUTH_GITHUB_KEY: **Client ID** from the GitHub OAuth app
- SOCIAL_AUTH_GITHUB_SECRET: **Client Secret** from the GitHub OAuth app

After you've got tunnistamo running locally, make sure the automatically created **Project** OpenID Connect Provider Client has the following settings:

    Response types: `id_token token` must be enabled
    Redirect URIs: `http://localhost:3000/callback` and `http://localhost:3000/silent_renew` must be in the listed URLs


Then make sure the *https://api.hel.fi/auth/helsinkiprofile*-scope can be used by the **Project** application. Go to OIDC_APIS -> API Scopes -> https://api.hel.fi/auth/profiles and make sure **Project** is selected in Allowed applications.

### Install open-city-profile locally
Clone the repository (https://github.com/City-of-Helsinki/open-city-profile). Follow the instructions for running open-city-profile with docker. Before running `docker-compose up` set the following settings in open-city-profile roots `docker-compose up`:

- OIDC_SECRET: leave empty, it's not needed
- OIDC_ENDPOINT: http://tunnistamo-backend:8000/openid

### Run youth-membership-ui
If running on Linux or MacOS, easiest way is to just run the app without docker. Any semi-new version of node should probably work, the docker-image is set to use node 12.

`docker-compose up` starts the container.

OR

Run `yarn` to install dependencies, start app with `yarn start`.

The graphql-backend for development is located at https://profiili-api.test.kuva.hel.ninja/graphql/, it has graphiql installed so you can browse it in your browser!

## Known issues
https://github.com/City-of-Helsinki/youth-membership-ui/issues

## Plans && Roadmap
https://helsinkisolutionoffice.atlassian.net/wiki/spaces/DD/pages/61505646/J+ss+ri

## Contact
Helsinki city Slack channel #omahelsinki

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
